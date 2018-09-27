/**
 * OaDataset
 * @author Simpli© CLI generator
 */
import { ID, Resource } from 'simpli-ts-vue'
import { ResponseSerialize, ValidationRequired } from 'simpli-ts-vue'
import { bool, datetime } from 'simpli-ts-vue'
import { OaVersion } from './OaVersion'

/* TODO: review generated class */
export class OaDataset extends Resource {
  readonly $name: string = 'OaDataset'
  readonly $endpoint: string = '/User/OaDataset{/id}'

  get $id() {
    return this.idOaDatasetPk
  }
  set $id(val: ID) {
    this.idOaDatasetPk = val
  }

  @ResponseSerialize(OaVersion) oaVersion: OaVersion | null = null

  idOaDatasetPk: ID = 0

  @ValidationRequired() creationDate: string = ''

  @ValidationRequired() active: boolean = false

  get idOaVersionFk() {
    if (!this.oaVersion) return 0
    return this.oaVersion.$id
  }
  set idOaVersionFk(idOaVersionFk: ID) {
    if (!this.oaVersion) this.oaVersion = new OaVersion()
    this.oaVersion.$id = idOaVersionFk
  }

  scheme() {
    return {
      oaVersion: this.oaVersion && this.oaVersion.$id,
      idOaDatasetPk: this.idOaDatasetPk,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      oaVersion: this.oaVersion && this.oaVersion.$id,
      idOaDatasetPk: this.idOaDatasetPk,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }
}
