declare module 'vue-js-popover' {
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
}
