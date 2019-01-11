const template = `
  <div>
    <div v-for="version in selectedOaRfu.objectOfAnalysis.oaVersions"
      :key="version.idOaVersionPk"
      class="version horiz items-center mb-9 pl-30"
      :class="{ selected: version.idOaVersionPk === selectedOaSelectedVersionId }"
      @click="selectVersion(version.idOaVersionPk)">
      <div class="weight-1">{{ version.title }}</div>
      <div class="weight-1 text-center">
        {{ version.lastDataset.creationDate | moment($t('dateFormat.datesimple')) }}
      </div>
      <div class="weight-1 text-right">{{ version.oaVersionStatus.title }}</div>
    </div>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, ObjectOfAnalysisRFU } from '../../models'
@Component({
  template,
})
export default class VersionChooser extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object, default: () => new ObjectOfAnalysisRFU() })
  selectedOaRfu?: ObjectOfAnalysisRFU

  @Prop({ type: Number })
  selectedDatasetIndexOrTheOnly?: number

  get selectedOaSelectedVersionId() {
    if (!this.value || !this.value.oaVersionIds || this.selectedDatasetIndexOrTheOnly === undefined) {
      return null
    }

    return this.value.oaVersionIds[this.selectedDatasetIndexOrTheOnly]
  }

  selectVersion(id: number) {
    if (!this.value || !this.value.oaVersionIds || !this.selectedDatasetIndexOrTheOnly) {
      return
    }

    this.$set(this.value.oaVersionIds, this.selectedDatasetIndexOrTheOnly, id)
  }
}
