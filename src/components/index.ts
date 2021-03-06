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
import { Marquee as MarqueeComponent } from './Marquee'
const Marquee = MarqueeComponent as VueClass<Vue>
import { InputDate as InputDateComponent } from './InputDate'
const InputDate = InputDateComponent as VueClass<Vue>
import { PeriodicityTransformationEditor as PeriodicityTransformationEditorComponent } from './PeriodicityTransformationEditor'
const PeriodicityTransformationEditor = PeriodicityTransformationEditorComponent as VueClass<Vue>
export { Chart, SelectGroup, SaveChart, ThumbOa, ChooseOa, Marquee, InputDate, PeriodicityTransformationEditor }
