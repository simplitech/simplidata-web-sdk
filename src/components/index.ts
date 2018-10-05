import { Vue } from 'vue-property-decorator'
import { VueClass } from 'vue-class-component/lib/declarations'
import { Chart as ChartComponent } from './Chart'
const Chart = ChartComponent as VueClass<Vue>
export { Chart }
