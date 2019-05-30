const template = `
  <div class="periodicity-transformation-editor">
    <await init name="periodicityTransformationEditor" class="verti">
      <h1 class="text-center">{{ title }}</h1>
      <div v-for="(oas, pId) in oasGroupedByPeriodicities" class="mb-40">
        <h4 v-if="getPeriodicityById(pId)" class="text-center tc-bright-green">{{ getPeriodicityById(pId).$tag }}</h4>

        <div class="weight-1 horiz des-gutter-15 tab-gutter-10 mob-gutter-5 items-center">
          <thumb-oa v-for="(o, i) in oas" :key="i" :oa="o" :showPlus="false" :showDownload="false" class="thumb-oa-small"/>
        </div>
      </div>

      <h1 class="text-center">{{ $t('view.periodicityMismatch.objectivePeriodicity') }}</h1>

      <div class="horiz gutter-5 items-center mb-30">
        <a v-for="(oas, pId) in oasGroupedByPeriodicities"
           @click="$emit('changeGeneralPeriodicity', getPeriodicityById(pId))"
           class="checkable-button p-8 pl-30"
           :class="{ checked: isPeriodicityChecked(pId) }">
          {{ getPeriodicityById(pId) ? getPeriodicityById(pId).$tag : '' }}
        </a>
      </div>

      <h1 class="text-center">{{ $t('view.periodicityMismatch.objectiveTransformation') }}</h1>

      <div class="horiz gutter-5 items-center mb-30">
        <a v-for="pt in periodicityTransformations.items"
           @click="$emit('changeAllPeriodicityTransformations', pt)"
           class="checkable-button p-8 pl-30"
           :class="{ checked: isTransformationCheched(pt.idPeriodicityTransformationTypePk) }">
          {{ pt ? pt.$tag : '' }}
        </a>
      </div>
    </await>
  </div>
`

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Collection, $ } from '../simpli'
import { OaPeriodicity, PeriodicityTransformationType, ObjectOfAnalysis, ObjectOfAnalysisRFU } from '../models'

interface MapOfLongAndObjectOfAnalysis {
  [key: number]: ObjectOfAnalysis[]
}

@Component({ template })
export class PeriodicityTransformationEditor extends Vue {
  @Prop({ type: String, required: true })
  title!: string
  @Prop({ type: Array, required: true })
  allOarfu!: ObjectOfAnalysisRFU[]
  @Prop({ type: Object, default: null })
  generalPeriodicity!: OaPeriodicity | null
  @Prop({ type: Object, default: null })
  selectedPeriodicityTransformation!: PeriodicityTransformationType | null

  periodicities = new Collection<OaPeriodicity>(OaPeriodicity)
  periodicityTransformations = new Collection<PeriodicityTransformationType>(PeriodicityTransformationType)

  async created() {
    await $.await.run(async () => {
      const q1 = this.periodicities.query()
      const q2 = this.periodicityTransformations.query()
      await q1
      await q2
    }, 'periodicityTransformationEditor')
  }

  get oasGroupedByPeriodicities() {
    const groups: MapOfLongAndObjectOfAnalysis = {}

    return this.allOarfu.reduce((groups, oarfu) => {
      if (oarfu.objectOfAnalysis && oarfu.objectOfAnalysis.periodicity) {
        const val = oarfu.objectOfAnalysis.periodicity.idOaPeriodicityPk as number
        groups[val] = groups[val] || []
        groups[val].push(oarfu.objectOfAnalysis)
      }
      return groups
    }, groups)
  }

  getPeriodicityById(id: string) {
    return this.periodicities.items.find(p => p.idOaPeriodicityPk === parseInt(id, 10))
  }

  isPeriodicityChecked(pId: number) {
    return this.generalPeriodicity && Number(pId) === this.generalPeriodicity.idOaPeriodicityPk
  }

  isTransformationCheched(idptt: number) {
    return (
      this.selectedPeriodicityTransformation &&
      this.selectedPeriodicityTransformation.idPeriodicityTransformationTypePk === idptt
    )
  }
}
