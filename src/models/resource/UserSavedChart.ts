/**
 * UserSavedChart
 * @author Simpli© CLI generator
 */
import { ID, Resource } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { Collection } from './Collection'
import { ChartType } from './ChartType'
import { ValueType } from './ValueType'
import { DownloadType } from './DownloadType'
import { TransformationType } from './TransformationType'
import { User } from './User'
import { ChartGraphic } from './ChartGraphic'
import { WithDataset } from './WithDataset'

/* TODO: review generated class */
export class UserSavedChart extends Resource {
  readonly $name: string = 'UserSavedChart'
  readonly $endpoint: string = '/User/UserSavedChart{/id}'

  get $id() {
    return this.idUserChartPk
  }
  set $id(val: ID) {
    this.idUserChartPk = val
  }

  @ResponseSerialize(Collection)
  collection: Collection | null = null

  @ResponseSerialize(DownloadType)
  downloadType: DownloadType | null = null

  graphics: ChartGraphic[] = []
  chartType = new ChartType()
  valueType = new ValueType()
  transformationType = new TransformationType()
  datasets: WithDataset[] = []

  @ResponseSerialize(User)
  user: User | null = null

  idUserChartPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(255)
  json: string = ''

  @ValidationRequired()
  creationDate: string = ''

  @ValidationRequired()
  active: boolean = false

  get idUserFk() {
    if (!this.user) return 0
    return this.user.$id
  }
  set idUserFk(idUserFk: ID) {
    if (!this.user) this.user = new User()
    this.user.$id = idUserFk
  }

  get idCollectionFk() {
    if (!this.collection) return 0
    return this.collection.$id
  }
  set idCollectionFk(idCollectionFk: ID) {
    if (!this.collection) this.collection = new Collection()
    this.collection.$id = idCollectionFk
  }

  get idDownloadTypeFk() {
    if (!this.downloadType) return 0
    return this.downloadType.$id
  }
  set idDownloadTypeFk(idDownloadTypeFk: ID) {
    if (!this.downloadType) this.downloadType = new DownloadType()
    this.downloadType.$id = idDownloadTypeFk
  }

  scheme(): any {
    return {
      collection: this.collection && this.collection.$id,
      downloadType: this.downloadType && this.downloadType.$id,
      user: this.user && this.user.$id,
      idUserChartPk: this.idUserChartPk,
      json: this.json,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      collection: this.collection && this.collection.$id,
      downloadType: this.downloadType && this.downloadType.$id,
      user: this.user && this.user.$id,
      idUserChartPk: this.idUserChartPk,
      json: this.json,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }
}
