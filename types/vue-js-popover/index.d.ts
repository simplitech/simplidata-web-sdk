declare module 'vue-js-popover' {
  import {PluginFunction} from 'vue/types/plugin'
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export class Popover extends Vue {
    visible: boolean
    positionClass: string
    position: {
      left: number
      top: number
    }
  }

  const Popover: PluginFunction<{}>
  export default Popover
}
