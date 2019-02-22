import { Vue } from 'vue-property-decorator'
import { VueClass } from 'vue-class-component/lib/declarations'
import { Chart as ChartComponent } from './chart/Chart'
const Chart = ChartComponent as VueClass<Vue>
import { SelectGroup as SelectGroupComponent } from './SelectGroup'
const SelectGroup = SelectGroupComponent as VueClass<Vue>
export { Chart, SelectGroup }
