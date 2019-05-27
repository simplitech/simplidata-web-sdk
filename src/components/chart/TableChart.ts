const template = `
  <div class="table-chart">
    <table>
      <thead>
        <tr>
          <th>{{ $t('view.chart.date') }}</th>
          <th v-for="(itemRfu, i) in value.itensRFU" :style="{ color: value.getColorByIndex(i) }">
            {{ itemRfu.contentTitleWithTransformation }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in value.chartData">
          <td v-for="cel in row">
            {{ cel }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart } from '../../models'

@Component({
  template,
})
export default class TableChart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart
}
