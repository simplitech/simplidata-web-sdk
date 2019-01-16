const template = `
  <div class="verti w-40">

    <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
      :title="$t('view.chart.saveChartOnCollection')"></a>

    <popover :name="'sg-save' + _uid" ref="savepopover">
      <div class="verti">
        <div v-if="myCollections.items.length" class="saved-collections verti mt-20 mx-10">
          <a v-for="c in myCollections.items" @click="persistUserSavedChart(c.idCollectionPk)" class="h-30 line-h-30">
            {{ c.title }}
          </a>
          <div class="divisor my-15"></div>
        </div>
        <a class="new-collection pl-40 pr-10 h-40 line-h-40" @click="openNewCollection">{{ $t('view.chart.newCollection') }}</a>
        <a class="download-collection pl-40 pr-10 h-40 line-h-40" @click="downloadCollectionOpen = true">{{ $t('view.chart.download') }}</a>
      </div>
    </popover>

    <template v-if="showDrawingButtons">
      <div class="mb-8 verti">
        <div class="relative top-30 left-30">
          <a class="chart-drop w-7 h-7" v-popover.right="{ name: 'sg-draw' + _uid }"></a>
        </div>
        <a v-if="lastBasicDrawingTool === 'Line'" class="chart-line h-40" @click="selectDrawingTool('Line')"></a>
        <a v-if="lastBasicDrawingTool === 'Ellipse'" class="chart-ellipse h-40" @click="selectDrawingTool('Ellipse')"></a>
        <a v-if="lastBasicDrawingTool === 'Rectangle'" class="chart-rectangle h-40" @click="selectDrawingTool('Rectangle')"></a>
      </div>

      <a class="chart-pencil h-40 mb-8 items-center" @click="selectDrawingTool('Pencil')"></a>

      <a class="chart-text h-40 mb-8 items-center" @click="selectDrawingTool('Text')"></a>
    </template>
    
    <popover :name="'sg-draw' + _uid" ref="drawpopover" class="force-w-50">
      <div class="verti">
        <a class="chart-line h-40 mb-8 items-center" @click="selectDrawingTool('Line')"></a>
        <a class="chart-ellipse h-40 mb-8 items-center" @click="selectDrawingTool('Ellipse')"></a>
        <a class="chart-rectangle h-40 items-center" @click="selectDrawingTool('Rectangle')"></a>
      </div>
    </popover>

    <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"></a>

    <a v-if="showCalcButton" class="chart-calc h-40 mb-8 items-center"></a>

    <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"></a>
    
    <!-- NEW COLLECTION FORM MODAL -->
    <div v-if="newCollection" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <form @submit.prevent="persistCollection" class="popup p-20 w-450 verti items-center">
        <a @click="newCollection = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.newCollection') }}</h1>
        <input type="text" v-model="newCollection.title" class="w-300" :placeholder="$t('view.chart.collectionName')"/>
        <button type="submit" class="submit mt-40 w-300 h-50 mb-30">{{ $t('view.chart.save') }}</button>
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

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import zipcelx from 'zipcelx'
import Popover from 'vue-js-popover'
import { UserSavedChart, Collection as SDCollection } from '../../models'
import { Collection } from '../../simpli'

@Component({
  template,
})
export default class ToolButtons extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showSaveButton?: boolean

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

  @Prop({ type: Boolean, default: true })
  showMeasureButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCalcButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCommentButton?: boolean

  readonly BASIC_DRAWING_TOOLS = ['Line', 'Ellipse', 'Rectangle']

  myCollections = new Collection(SDCollection)
  newCollection: SDCollection | null = null
  downloadCollectionOpen = false
  selectedDrawingTool: string | null = null
  lastBasicDrawingTool = 'Line'

  selectDrawingTool(newSelected: string) {
    this.selectedDrawingTool = newSelected

    if (this.BASIC_DRAWING_TOOLS.indexOf(newSelected) > -1) {
      this.lastBasicDrawingTool = newSelected
    }

    // @ts-ignore
    const component = this.$refs.drawpopover as Popover
    component.visible = false

    this.$emit('selectedDrawingTool', this.selectedDrawingTool)
  }

  async mounted() {
    await this.populateData()
  }

  openNewCollection() {
    this.newCollection = new SDCollection()
  }

  async populateData() {
    if (!this.value) {
      return
    }

    await this.myCollections.query()
  }

  async persistCollection() {
    if (!this.newCollection || !this.value) {
      return
    }

    const resp = await this.newCollection.save<number>()
    this.newCollection.idCollectionPk = resp.data
    this.myCollections.items.push(this.newCollection)
    this.newCollection = null
    await this.persistUserSavedChart(resp.data)
  }

  async persistUserSavedChart(idCollection: number | null, idDownloadType: number | null = null) {
    if (!this.value) {
      return
    }

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
    await this.value.save()
    this.$emit('userSavedChart')
  }

  async downloadXls() {
    if (!this.value || !this.value.chartData) {
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
        value: itemrfu.$contentTitle,
        type: 'string',
      }
    })

    const filename = this.value.itensRFU.reduce((name, itemrfu) => {
      return name + (name.length ? ' + ' : '') + itemrfu.$contentTitle
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

    await this.persistUserSavedChart(null, 1)
  }
}
