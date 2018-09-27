/**
 * UserSavedChart
 * @author Simpli© CLI generator
 */
import { ID, Resource } from 'simpli-ts-vue'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool, datetime } from 'simpli-ts-vue'
import { Collection } from './Collection'
import { DownloadType } from './DownloadType'
import { User } from './User'

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

  @ResponseSerialize(Collection) collection: Collection | null = null

  @ResponseSerialize(DownloadType) downloadType: DownloadType | null = null

  @ResponseSerialize(User) user: User | null = null

  idUserChartPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(255)
  json: string = ''

  @ValidationRequired() creationDate: string = ''

  @ValidationRequired() active: boolean = false

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

  scheme() {
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

  csvScheme() {
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
