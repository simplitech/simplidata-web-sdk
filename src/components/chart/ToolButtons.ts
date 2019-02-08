const template = `
  <div class="verti w-40">

    <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
      :title="$t('view.chart.saveChartOnCollection')"></a>

    <popover :name="'sg-save' + _uid" ref="savepopover">
      <await name="save">
        <div class="verti">
          <div v-if="myCollections.items.length" class="saved-collections verti mt-20 mx-10">
            <a v-for="c in myCollections.items" @click="$await.run(() => persistUserSavedChart(c.idCollectionPk), 'save')" class="h-30 line-h-30">
              {{ c.title }}
            </a>
            <div class="divisor my-15"></div>
          </div>
          <a class="new-collection pl-40 pr-10 h-40 line-h-40" @click="openNewCollection">{{ $t('view.chart.newCollection') }}</a>
          <a class="download-collection pl-40 pr-10 h-40 line-h-40" @click="downloadCollectionOpen = true">{{ $t('view.chart.download') }}</a>
        </div>
      </await>
    </popover>

    <template v-if="showDrawingButtons">
      <div class="mb-8 verti">
        <div class="relative top-30 left-30">
          <a class="chart-drop w-7 h-7" v-popover.right="{ name: 'sg-draw' + _uid }"></a>
        </div>
        <a v-if="lastBasicDrawingTool === 'Line'" class="chart-line h-40" @click="selectDrawingTool('Line')"></a>
        <a v-if="lastBasicDrawingTool === 'Ellipse'" class="chart-ellipse h-40" @click="selectDrawingTool('Ellipse')"></a>
        <a v-if="lastBasicDrawingTool === 'Rectangle'" class="chart-rectangle h-40" @click="selectDrawingTool('Rectangle')"></a>
      </div>

      <a class="chart-pencil h-40 mb-8 items-center" @click="selectDrawingTool('Pencil')"></a>

      <a class="chart-text h-40 mb-8 items-center" @click="selectDrawingTool('Text')"></a>
    </template>
    
    <popover :name="'sg-draw' + _uid" ref="drawpopover" class="force-w-50">
      <div class="verti">
        <a class="chart-line h-40 mb-8 items-center" @click="selectDrawingTool('Line')"></a>
        <a class="chart-ellipse h-40 mb-8 items-center" @click="selectDrawingTool('Ellipse')"></a>
        <a class="chart-rectangle h-40 items-center" @click="selectDrawingTool('Rectangle')"></a>
      </div>
    </popover>

    <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"
      @click="selectDrawingTool('Measure')"></a>

    <a v-if="showCalcButton" class="chart-calc h-40 mb-8 items-center"></a>

    <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"
      @click="selectDrawingTool('Comment')"></a>
    
    <!-- NEW COLLECTION FORM MODAL -->
    <div v-if="newCollection" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <form @submit.prevent="$await.run(persistCollection, 'save')" class="popup p-20 w-450 verti items-center">
        <a @click="newCollection = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.newCollection') }}</h1>
        <input type="text" v-model="newCollection.title" class="w-300" :placeholder="$t('view.chart.collectionName')"/>
        <await name="save">
          <button type="submit" class="submit mt-40 w-300 h-50 mb-30">{{ $t('view.chart.save') }}</button>
        </await>
      </form>
    </div>
    
    <!-- DOWNLOAD COLLECTION MODAL -->
    <div v-if="downloadCollectionOpen" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <div class="popup p-20 w-450 verti items-center">
        <a @click="downloadCollectionOpen = false" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.contentDownload') }}</h1>
        <a class="squared w-60 h-60 line-h-60 text-center" @click="downloadXls">{{ $t('view.chart.xls') }}</a>
      </div>
    </div>
    
    <!-- CHART SHOW COMMENT MODAL -->
    <div v-if="commentOpen" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center verti">
      <div class="popup p-20 w-450 verti items-center">
        <a @click="commentOpen = null" class="close w-20 h-20 self-right"></a>
        <p class="comment-text">
          {{ commentOpen.text }}
        </p>
        <a @click="showEditCommentButtons = true" class="ctx-hor w-40 h-15 self-right"></a>
      </div>
      <div v-if="showEditCommentButtons" class="horiz w-450 items-right-center mt-8">
        <a class="btn basic trash force-min-w-50 force-h-25 mr-6"></a>
        <a class="btn basic edit force-min-w-50 force-h-25"></a>
      </div>
    </div>
    
    <!-- CHART EDIT COMMENT MODAL -->
    <div v-if="editingComment" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <div class="popup p-20 w-450 verti">
        <input
          v-focus
          v-model="graphicBeingBuiltAsComment.text"
          type="text"
          class="input-comment mb-15"
          :placeholder="$t('view.chart.writeYourComment')"/>
        <div class="horiz items-right-center">
          <a class="cancel-btn w-50 h-30"
            @click="graphicBeingBuilt.$isCancelled = true"></a>
          <a class="ok-btn w-50 h-30" :class="{ 'opacity-20': !graphicBeingBuilt.$isValidToSave }"
             @click="graphicBeingBuilt.$isDone = true"></a>
         </div>
      </div>
    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import zipcelx from 'zipcelx'
import Popover from 'vue-js-popover'
import {
  UserSavedChart,
  Collection as SDCollection,
  LineChartGraphic,
  EllipseChartGraphic,
  RectangleChartGraphic,
  PencilChartGraphic,
  TextChartGraphic,
  CommentChartGraphic,
  MeasureChartGraphic,
  ChartGraphic,
} from '../../models'
import { Collection } from '../../simpli'
import ChartBus from '../../utils/ChartBus'

@Component({
  template,
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
})
export default class ToolButtons extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showSaveButton?: boolean

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

  @Prop({ type: Boolean, default: true })
  showMeasureButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCalcButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCommentButton?: boolean

  readonly BASIC_DRAWING_TOOLS = ['Line', 'Ellipse', 'Rectangle']

  myCollections = new Collection(SDCollection)
  newCollection: SDCollection | null = null
  downloadCollectionOpen = false
  selectedDrawingTool: string | null = null
  lastBasicDrawingTool = 'Line'
  commentOpen: CommentChartGraphic | null = null
  graphicBeingBuilt: ChartGraphic | null = null
  showEditCommentButtons = false

  get graphicBeingBuiltAsComment() {
    if (!this.graphicBeingBuilt || !(this.graphicBeingBuilt instanceof CommentChartGraphic)) {
      return null
    }

    return this.graphicBeingBuilt as CommentChartGraphic
  }

  get editingComment() {
    return (
      this.graphicBeingBuilt &&
      !this.graphicBeingBuilt.$isDone &&
      !this.graphicBeingBuilt.$isCancelled &&
      this.graphicBeingBuiltAsComment &&
      this.graphicBeingBuiltAsComment.position !== null
    )
  }

  selectDrawingTool(newSelected: string) {
    this.selectedDrawingTool = newSelected

    if (this.BASIC_DRAWING_TOOLS.indexOf(newSelected) > -1) {
      this.lastBasicDrawingTool = newSelected
    }

    // @ts-ignore
    const component = this.$refs.drawpopover as Popover
    component.visible = false

    if (this.selectedDrawingTool === 'Line') {
      this.graphicBeingBuilt = new LineChartGraphic()
    } else if (this.selectedDrawingTool === 'Ellipse') {
      this.graphicBeingBuilt = new EllipseChartGraphic()
    } else if (this.selectedDrawingTool === 'Rectangle') {
      this.graphicBeingBuilt = new RectangleChartGraphic()
    } else if (this.selectedDrawingTool === 'Pencil') {
      this.graphicBeingBuilt = new PencilChartGraphic()
    } else if (this.selectedDrawingTool === 'Text') {
      this.graphicBeingBuilt = new TextChartGraphic()
    } else if (this.selectedDrawingTool === 'Comment') {
      this.graphicBeingBuilt = new CommentChartGraphic()
    } else if (this.selectedDrawingTool === 'Measure') {
      this.graphicBeingBuilt = new MeasureChartGraphic()
    }

    this.$emit('selectedDrawingTool', this.graphicBeingBuilt)
  }

  async mounted() {
    await this.populateData()

    ChartBus.$on('openComment', this.openChartComment)
  }

  openNewCollection() {
    this.newCollection = new SDCollection()
  }

  async populateData() {
    if (!this.value) {
      return
    }

    await this.myCollections.query()
  }

  async persistCollection() {
    if (!this.newCollection || !this.value) {
      return
    }

    const resp = await this.newCollection.save<number>()
    this.newCollection.idCollectionPk = resp.data
    this.myCollections.items.push(this.newCollection)
    await this.persistUserSavedChart(resp.data)
    this.newCollection = null
  }

  async persistUserSavedChart(idCollection: number | null, idDownloadType: number | null = null) {
    if (!this.value) {
      return
    }

    if (idCollection) {
      this.value.idCollectionFk = idCollection
    } else {
      this.value.collection = null
    }

    if (idDownloadType) {
      this.value.idDownloadTypeFk = idDownloadType
    } else {
      this.value.downloadType = null
    }

    this.value.buildJson()
    await this.value.save()
    this.$emit('userSavedChart')
  }

  async downloadXls() {
    if (!this.value || !this.value.chartData) {
      return
    }

    const data = this.value.chartData.map(item => {
      return item.map((value: any, i: number) => {
        return {
          value,
          type: i === 0 ? 'string' : 'number',
        }
      })
    })

    const names = this.value.itensRFU.map((itemrfu, i) => {
      return {
        value: itemrfu.$contentTitle,
        type: 'string',
      }
    })

    const filename = this.value.itensRFU.reduce((name, itemrfu) => {
      return name + (name.length ? ' + ' : '') + itemrfu.$contentTitle
    }, '')

    await zipcelx({
      filename,
      sheet: {
        data: [
          [
            {
              value: this.$t('view.chart.date'),
              type: 'string',
            },
            ...names,
          ],
          ...data,
        ],
      },
    })

    await this.persistUserSavedChart(null, 1)
  }

  openChartComment(comment: CommentChartGraphic) {
    this.commentOpen = comment
  }
}
