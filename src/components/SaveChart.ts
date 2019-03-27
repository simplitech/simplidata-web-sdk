const template = `
  <div>
    <await name="save">
      <div class="verti">
        <div v-if="myCollections.items.length" class="saved-collections verti mt-20 mx-10">
          <a v-for="c in myCollections.items" @click="$await.run(() => persistUserSavedChart(c.idCollectionPk), 'save')" class="h-30 line-h-30">
            {{ c.title }}
          </a>
          <div class="divisor my-15"></div>
        </div>
        <a class="new-collection pl-40 pr-10 h-40 line-h-40" @click="openNewCollection">{{ $t('view.chart.newCollection') }}</a>
        <a class="download-collection pl-40 pr-10 h-40 line-h-40" @click="downloadCollectionOpen = true">{{ $t('view.chart.download') }}</a>
      </div>
    </await>
    
    <!-- NEW COLLECTION FORM MODAL -->
    <div v-if="newCollection" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <form @submit.prevent="$await.run(persistCollection, 'save')" class="popup p-20 w-450 verti items-center">
        <a @click="newCollection = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.newCollection') }}</h1>
        <input type="text" v-model="newCollection.title" class="w-300" :placeholder="$t('view.chart.collectionName')"/>
        <await name="save">
          <button type="submit" class="submit mt-40 w-300 h-50 mb-30">{{ $t('view.chart.save') }}</button>
        </await>
      </form>
    </div>
    
    <!-- DOWNLOAD COLLECTION MODAL -->
    <div v-if="downloadCollectionOpen" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <div class="popup p-20 w-450 verti items-center">
        <a @click="downloadCollectionOpen = false" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.contentDownload') }}</h1>
        <a class="squared w-60 h-60 line-h-60 text-center" @click="downloadXls">{{ $t('view.chart.xls') }}</a>
      </div>
    </div>

  </div>
  
`

import { Component, Prop, Vue } from 'vue-property-decorator'
import zipcelx from 'zipcelx'
import { $, Collection } from '../simpli'
import {
  Collection as SDCollection,
  DownloadType,
  ObjectOfAnalysis,
  ObjectOfAnalysisRFU,
  UserSavedChart,
} from '../models'

@Component({ template })
export class SaveChart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value!: UserSavedChart

  @Prop({ type: Object })
  oa?: ObjectOfAnalysis

  myCollections = new Collection(SDCollection)
  newCollection: SDCollection | null = null
  downloadCollectionOpen = false

  async mounted() {
    await $.await.run(() => this.populateData(), 'save')
  }

  async populateData() {
    await this.myCollections.query()

    if (!this.value.idUserChartPk && this.oa !== undefined) {
      await this.oa.find(this.oa.idObjectOfAnalysisPk)
      this.value.itensRFU.push(new ObjectOfAnalysisRFU(this.oa, this.oa.oaVersions[0]))
    }
  }

  async persistCollection() {
    if (!this.newCollection) {
      return
    }

    const resp = await this.newCollection.save<number>()
    this.newCollection.idCollectionPk = resp.data
    this.myCollections.items.push(this.newCollection)
    await this.persistUserSavedChart(resp.data)
    this.newCollection = null
  }

  openNewCollection() {
    this.newCollection = new SDCollection()
  }

  async downloadXls() {
    if (!this.value.chartData) {
      return
    }

    const data = this.value.chartData.map(item => {
      return item.map((value: any, i: number) => {
        return {
          value,
          type: i === 0 ? 'string' : 'number',
        }
      })
    })

    const names = this.value.itensRFU.map((itemrfu, i) => {
      return {
        value: itemrfu.contentTitleWithTransformation,
        type: 'string',
      }
    })

    const filename = this.value.itensRFU.reduce((name, itemrfu) => {
      return name + (name.length ? ' + ' : '') + itemrfu.contentTitleWithTransformation
    }, '')

    await zipcelx({
      filename,
      sheet: {
        data: [
          [
            {
              value: this.$t('view.chart.date'),
              type: 'string',
            },
            ...names,
          ],
          ...data,
        ],
      },
    })

    await this.persistUserSavedChart(null, DownloadType.XLS)
  }

  async persistUserSavedChart(idCollection: number | null, idDownloadType: number | null = null) {
    if (idCollection) {
      this.value.idCollectionFk = idCollection
    } else {
      this.value.collection = null
    }

    if (idDownloadType) {
      this.value.idDownloadTypeFk = idDownloadType
    } else {
      this.value.downloadType = null
    }

    this.value.buildJson()
    const resp = await this.value.save()
    this.value.lastSavedJson = this.value.relevantToSave
    this.$emit('userSavedChart', resp.data)
  }
}
