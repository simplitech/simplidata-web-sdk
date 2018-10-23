/**
 * OaData
 * @author Simpli© CLI generator
 */
import { ID, Resource } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationRequired } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { OaDataset } from './OaDataset'

/* TODO: review generated class */
export class OaData extends Resource {
  readonly $name: string = 'OaData'
  readonly $endpoint: string = '/User/OaData{/id}'

  get $id() {
    return this.idOaDataPk
  }
  set $id(val: ID) {
    this.idOaDataPk = val
  }

  @ResponseSerialize(OaDataset)
  oaDataset: OaDataset | null = null

  idOaDataPk: ID = 0

  @ValidationRequired()
  value: number = 0

  @ValidationRequired()
  dt: string = ''

  @ValidationRequired()
  active: boolean = false

  get idOaDatasetFk() {
    if (!this.oaDataset) return 0
    return this.oaDataset.$id
  }
  set idOaDatasetFk(idOaDatasetFk: ID) {
    if (!this.oaDataset) this.oaDataset = new OaDataset()
    this.oaDataset.$id = idOaDatasetFk
  }

  scheme(): any {
    return {
      oaDataset: this.oaDataset && this.oaDataset.$id,
      idOaDataPk: this.idOaDataPk,
      value: this.value,
      dt: datetime(this.dt),
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      oaDataset: this.oaDataset && this.oaDataset.$id,
      idOaDataPk: this.idOaDataPk,
      value: this.value,
      dt: datetime(this.dt),
      active: bool(this.active),
    }
  }
}
