const template = `
  <div class="transformations py-10 verti">
        
    <div class="horiz items-center">
      <div class="transformationTitle weight-1">{{ $t('view.chart.transformation') }}</div>
      <a class="addTransformation" v-popover="{ name: 'sg-tc' + _uid }">{{ $t('view.chart.add') }}</a>
    </div>
    
    <transition name="fade-down" mode="out-in">
      <popover :name="'sg-tc' + _uid" ref="popover">
        <div class="popover-content">
          <div v-for="t in allTransformationTypes.items"
          :key="t.idTransformationTypePk"
          class="liTC px-15 py-10"
          @click="addTransformation(t)">
           {{ t.title }}
          </div>
        </div>
      </popover>
    </transition>
    
    <div class="horiz items-left-center">
      <div v-for="(t, i) in selectedOaRfu.orderedTransformations" :key="i.idTransformationTypePk"
           class="transformationItem h-25 horiz items-left-center pl-10 pr-10 m-5">
        <div class="weight-1 mr-10">
           {{ t.titleWithCombiner }}
        </div>
        <a class="removeTransformation w-8 h-8" @click="removeTransformation(i)"></a>
      </div>
    </div>
    
    <!-- CHOOSE COMBINER MODAL -->
    <div v-if="transformationToChooseCombiner" class="darkerscrim fixed top-0 left-0 w-window z-scrim items-center">
      <div class="pt-20 verti items-center max-w-600 h-window">
        <a @click="transformationToChooseCombiner = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.chooseTheOaToCombineInTheTransformation') }}</h1>
        <input v-model="queryCombiner" @input="debounceSearchCombiner" type="text" class="searchCombiner w-full" :placeholder="$t('view.chart.search')"/>
        <await name="searchCombinerResult" class="weight-1 y-scroll horiz mt-20">
          <a v-for="oa in searchCombinerResult.items" @click="$await.run(() => addCombiner(oa), 'searchCombinerResult')" class="m-5">
            <thumb-oa :oa="oa" :showPlus="false" :showDownload="false" style="width: 280px"/>
          </a>
        </await>
      </div>
    </div>
    
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Popover } from 'vue-js-popover'
import { debounce } from 'lodash'
import { UserSavedChart, TransformationType, ObjectOfAnalysisRFU, ObjectOfAnalysis } from '../../models'
import { Collection } from '../../simpli'

@Component({
  template,
})
export default class TransformationsEditor extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object, default: () => new ObjectOfAnalysisRFU() })
  selectedOaRfu?: ObjectOfAnalysisRFU

  readonly DEBOUNCE_TIMER = 300

  allTransformationTypes = new Collection(TransformationType)
  transformationToChooseCombiner: TransformationType | null = null
  queryCombiner: string | null = null
  searchCombinerResult = new Collection(ObjectOfAnalysis)
  debounceSearchCombiner = debounce(async () => await this.searchCombiner(), this.DEBOUNCE_TIMER)

  async mounted() {
    await this.populateData()
  }

  async populateData() {
    await this.allTransformationTypes.query()
  }

  addTransformation(transformation: TransformationType) {
    // @ts-ignore
    const component = this.$refs.popover as Popover
    component.visible = false

    if (transformation.combiner && !transformation.combineWith) {
      this.transformationToChooseCombiner = transformation.clone()
      return
    }

    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.push(transformation)
    }
  }

  async addCombiner(oa: ObjectOfAnalysis) {
    await oa.find(oa.idObjectOfAnalysisPk)
    if (!this.transformationToChooseCombiner || !oa.oaVersions.length || !oa.oaVersions[0].lastDataset) {
      return
    }

    this.transformationToChooseCombiner.combineWith = new ObjectOfAnalysisRFU(oa, oa.oaVersions[0])
    this.addTransformation(this.transformationToChooseCombiner)
    this.transformationToChooseCombiner = null
  }

  removeTransformation(index: number) {
    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.splice(index, 1)
    }
  }

  async searchCombiner() {
    if (!this.queryCombiner || !this.queryCombiner.length) {
      this.searchCombinerResult.items = []
    } else {
      await this.searchCombinerResult.query({ query: this.queryCombiner }, 'searchCombinerResult')
    }
  }
}
