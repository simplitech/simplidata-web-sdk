const template = `
  <div class="thumb-oa">
    <div class="thumb-inner verti w-full">
      <div class="row horiz nowrap items-center">
        <div class="col weight-1" :style="{maxWidth: 'calc(100% - 65px)'}">
          <a class="btn mini" v-if="oa.plan && oa.plan.$id !== PlanID.NO_PLAN">
            {{oa.plan.$tag}}
          </a>
        </div>
  
        <div class="col hidden-options">
          <a v-if="showPlus" @click="saveClick" class="btn icon mr-4">
            <i class="icon-plus icon"></i>
          </a>
  
          <a v-if="showDownload" @click="saveClick" class="btn icon">
            <i class="icon-cloud-download icon"></i>
          </a>
        </div>
  
        <div v-if="selectable" class="col" :class="[selected ? 'oa-selected' : 'oa-selector']"></div>
      </div>
  
      <a @click="$emit('navigate')" class="oa-title">
        {{oa.$tag}}
      </a>
  
      <a @click="$emit('navigate')" class="weight-1 items-center">
        <img :src="oa.$thumbnail" class="chart-img" alt="graph">
      </a>
    </div>
  </div>
  
`

import { Component, Prop, Vue } from 'vue-property-decorator'
import { ObjectOfAnalysis } from '../models'
import { PlanID } from '../enums'

@Component({
  template,
})
export class ThumbOa extends Vue {
  @Prop({ type: Object, required: true })
  oa?: ObjectOfAnalysis

  PlanID = PlanID
  @Prop({ type: Boolean, default: true })
  showPlus?: boolean
  @Prop({ type: Boolean, default: true })
  showDownload?: boolean
  @Prop({ type: Boolean, default: false })
  selectable?: boolean
  @Prop({ type: Boolean, default: false })
  selected?: boolean

  saveClick() {
    this.$emit('saveClick', this.oa)
  }
}
