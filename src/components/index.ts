import { Vue } from 'vue-property-decorator'
import { VueClass } from 'vue-class-component/lib/declarations'
import { Chart as ChartComponent } from './chart/Chart'
const Chart = ChartComponent as VueClass<Vue>
import { SelectGroup as SelectGroupComponent } from './SelectGroup'
const SelectGroup = SelectGroupComponent as VueClass<Vue>
import { SaveChart as SaveChartComponent } from './SaveChart'
const SaveChart = SaveChartComponent as VueClass<Vue>
import { ThumbOa as ThumbOaComponent } from './ThumbOa'
const ThumbOa = ThumbOaComponent as VueClass<Vue>
import { ChooseOa as ChooseOaComponent } from './ChooseOa'
const ChooseOa = ChooseOaComponent as VueClass<Vue>
export { Chart, SelectGroup, SaveChart, ThumbOa, ChooseOa }
