const template = `
  <div class="input-date horiz items-center">
    <input type="date" v-model="valueAsInput" class="weight-1":placeholder="placeholder" />
    <a class="icon icon-close" v-show="valueAsInput" @click="emitEmpty"></a>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import moment from 'moment'

@Component({
  template,
})
export class InputDate extends Vue {
  @Prop({ type: String, required: true })
  value!: string
  @Prop({ type: String })
  placeholder?: string

  inputFromDt(dt: string | null) {
    return dt ? moment(dt).format('YYYY-MM-DD') : null
  }

  dtFromInput(dt: string | null) {
    if (!dt) {
      return null
    }

    const dtMoment = moment(dt)

    if (dtMoment.year() < 1000 || dtMoment.year() > 9999) {
      return null
    }

    return dtMoment.format()
  }

  get valueAsInput() {
    return this.value ? this.inputFromDt(this.value) : null
  }

  set valueAsInput(val) {
    if (!val) {
      return
    }

    const dt = this.dtFromInput(val)

    if (dt) {
      this.$emit('input', dt)
    }
  }

  emitEmpty() {
    this.$emit('input', null)
  }
}
