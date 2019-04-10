const template = `
  <div class="frame hvr-grow min-h-200">
    <div class="verti w-full rel">

      <div class="row compact horiz nowrap items-center">
        <div class="col weight-1" :style="{maxWidth: 'calc(100% - 65px)'}">
          <a class="btn mini dark-basic" v-if="oa.plan && oa.plan.$id !== PlanID.NO_PLAN">
            {{oa.plan.$tag}}
          </a>
        </div>

        <div class="col frame-hidden">
          <a v-if="showPlus" @click="saveClick" class="btn icon compact mr-4">
            <i class="icon-plus icon"></i>
          </a>

          <a v-if="showDownload" @click="saveClick" class="btn icon compact">
            <i class="icon-cloud-download icon"></i>
          </a>
        </div>

        <div v-if="selectable" class="col">
          <img v-if="!selected" src="@/assets/img/oa-selector.svg">
          <img v-if="selected" src="@/assets/img/oa-selected.svg">
        </div>
      </div>

      <a @click="$emit('navigate')" class="frame-label display mini fade-truncate">
        <div class="truncate-shadow"></div>
        <div class="truncate-content">
          {{oa.$tag}}
        </div>
      </a>

      <div class="weight-1 items-center">
        <img :src="oa.$thumbnail" class="img-contain" alt="graph">
      </div>
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
