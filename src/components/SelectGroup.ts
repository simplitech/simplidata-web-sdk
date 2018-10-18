const template = `
  <div v-popover="{ name: 'sg' + _uid }" class="selectGroup horiz items-center no-wrap">
    <span class="label">{{ label }}</span>
    <span class="value weight-1 mx-10">
      <template v-if="computedModel.$tag">
        {{ computedModel.$tag }}
      </template>
      <template v-else>
        {{ empty }}
      </template>
    </span>
    <div class="chevron w-8 h-5"></div>

    <transition name="fade-down" mode="out-in">
      <popover :name="'sg' + _uid" ref="popover">
        <div 
        class="liSg px-15 py-10"
        :class="{ selected: !computedModel.$id }"
        @click="computedModel = null">
         {{ empty }}
        </div>
        <div v-for="i in computedItems"
        :key="i.$id"
        class="liSg px-15 py-10"
        :class="{ selected: computedModel.$id === i.$id }"
        @click="computedModel = i">
         {{ i.$tag }}
        </div>
      </popover>
    </transition>
  </div>
`

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Resource } from 'simpli-web-sdk'
import { plainToClassFromExist } from 'class-transformer'
import { Popover } from 'vue-js-popover'

@Component({ template })
export default class SelectGroup extends Vue {
  @Prop({ type: String })
  label?: string

  @Prop({ type: String })
  empty?: string

  @Prop({ type: Object })
  value?: Resource

  @Prop({ default: () => [] })
  items?: Resource[]

  get computedModel() {
    if (this.value && this.items) {
      const resource = this.value as Resource
      const selected = this.items.find((item: Resource) => item.$id === resource.$id)
      if (selected) {
        return {
          $id: selected.$id,
          $tag: selected.$tag,
        }
      }
    }

    return {}
  }

  set computedModel(val: object) {
    if (!this.value) {
      return
    }

    /* tslint:disable-next-line */
    this.$refs.popover['visible'] = false

    const nullOption = {
      $id: 0,
      $tag: '',
    }
    this.$emit('input', plainToClassFromExist(this.value, val || nullOption))
  }

  get computedItems() {
    return this.items!.map((item: Resource) => ({
      $id: item.$id,
      $tag: item.$tag,
    })) as object[]
  }
}
