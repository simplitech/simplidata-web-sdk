/**
 * OaData
 * @author Simpli CLI generator
 */
import { ID, Resource } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { OaDataset } from './OaDataset'
import OaDataSchema from '../../schemas/OaData.schema'

export class OaData extends Resource {
  readonly $name: string = 'OaData'
  readonly $endpoint: string = '/User/OaData{/id}'

  get $schema() {
    return OaDataSchema(this)
  }

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
  value?: number | null = null

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

  constructor(dt: string = '', value?: number | null) {
    super()
    this.value = value
    this.dt = dt
  }
}
