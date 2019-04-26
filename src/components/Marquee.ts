const template = `
  <div style="overflow: hidden">
    <div ref="marquee" class="horiz nowrap gutter-50 w-full" style="position: relative">
      <div ref="text" v-for="n in 2" :key="n" v-html="text"></div>
    </div>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({ template })
export class Marquee extends Vue {
  @Prop({ type: Number, default: 60 })
  fps!: number // frames per second
  @Prop({ type: Number, default: 60 })
  pps!: number // pixel per second
  @Prop({ type: String, required: true })
  text!: string

  posX = 0

  viewWidth = 0
  textWidth = 0
  animationLength = 0
  hasAnimation: boolean | null = null

  controller: number | null = null
  requestAnimId: number | null = null

  get pixelsPerFrame() {
    return this.pps / Math.max(this.fps, 1)
  }

  @Watch('text')
  textEvent() {
    this.viewWidth = this.$el.clientWidth

    const el = this.$refs.text as HTMLElement[]
    if (el && el[0]) {
      this.textWidth = el[0].clientWidth
    }

    this.animationLength = this.textWidth > this.viewWidth ? this.textWidth + 50 : 0
    this.hasAnimation = this.animationLength > 0

    if (this.hasAnimation) {
      this.startAnimation()
    } else {
      this.stopAnimation()
    }
  }

  @Watch('posX')
  posXEvent(val: number) {
    const el = this.$refs.marquee as HTMLElement
    if (el) {
      el.style.left = `-${val}px`
    }
  }

  @Watch('hasAnimation')
  hasAnimationEvent(val: boolean) {
    const el = this.$refs.text as HTMLElement[]
    if (el && el[1]) {
      if (val) {
        el[1].style.visibility = 'unset'
      } else {
        el[1].style.visibility = 'hidden'
      }
    }
  }

  startAnimation() {
    if (this.fps === 60) {
      const recursiveAnim = () => {
        this.enterFrameEvent()
        this.requestAnimId = window.requestAnimationFrame(recursiveAnim)
      }

      // start the mainloop
      this.requestAnimId = window.requestAnimationFrame(recursiveAnim)
    } else {
      this.controller = window.setInterval(() => this.enterFrameEvent(), Math.max(1000 / this.fps, 1))
    }
  }

  stopAnimation() {
    if (this.requestAnimId) {
      window.cancelAnimationFrame(this.requestAnimId)
    } else if (this.controller) {
      clearInterval(this.controller)
      this.controller = null
    }
  }

  enterFrameEvent() {
    this.posX += this.pixelsPerFrame
    if (this.posX > this.animationLength) {
      this.posX = 0
    }
  }

  mounted() {
    this.textEvent()
  }

  beforeDestroy() {
    this.stopAnimation()
  }
}
