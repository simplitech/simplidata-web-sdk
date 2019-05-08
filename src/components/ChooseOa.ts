const template = `
  <div class="choose-oa darkerscrim fixed top-0 left-0 w-window z-scrim items-center">
    <div class="pt-20 des-mx-80 tab-mx-20 verti items-center w-full h-window">
      <a @click="$emit('close')" class="close w-20 h-20 self-right"></a>
      <h1 class="mt-0 mb-40">{{ $t('view.chart.chooseTheOaToCombineInTheTransformation') }}</h1>
      <input v-model="queryCombiner" @input="debounceSearchCombiner" type="text" class="searchCombiner w-full" :placeholder="$t('view.chart.search')"/>
      <await name="searchCombinerResult" class="weight-1 y-scroll verti mt-20">
        <div class="horiz items-center">
          <a v-for="oa in searchCombinerResult.items" @click="$await.run(() => $emit('done', oa), 'searchCombinerResult')" class="m-5">
            <thumb-oa :oa="oa" :showPlus="false" :showDownload="false" style="width: 280px"/>
          </a>
        </div>
        <div class="horiz items-center" v-if="otherOasRFU.length && !searchCombinerResult.items.length">
          <a v-for="oa in otherOasRFU" @click="$await.run(() => $emit('done', oa.objectOfAnalysis), 'searchCombinerResult')" class="m-5">
            <thumb-oa :oa="oa.objectOfAnalysis" :showPlus="false" :showDownload="false" style="width: 280px"/>
          </a>
        </div>
      </await>
    </div>
  </div>
  
`

import { Component, Prop, Vue } from 'vue-property-decorator'
import { ObjectOfAnalysis, ObjectOfAnalysisRFU } from '../models'
import { debounce } from 'lodash'
import { Collection } from '../simpli'

@Component({
  template,
})
export class ChooseOa extends Vue {
  @Prop({ type: Array, default: () => [] })
  otherOasRFU!: ObjectOfAnalysisRFU[]

  readonly DEBOUNCE_TIMER = 300

  queryCombiner: string | null = null
  searchCombinerResult = new Collection(ObjectOfAnalysis)
  debounceSearchCombiner = debounce(async () => await this.searchCombiner(), this.DEBOUNCE_TIMER)

  async searchCombiner() {
    if (!this.queryCombiner || !this.queryCombiner.length) {
      this.searchCombinerResult.items = []
    } else {
      await this.searchCombinerResult.query({ query: this.queryCombiner }, 'searchCombinerResult')
    }
  }
}
