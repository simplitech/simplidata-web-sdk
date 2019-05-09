/**
 * OaData
 * @author Simpli CLI generator
 */
import { ID, Resource } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { OaDataset } from './OaDataset'
import OaDataSchema from '../../schemas/OaData.schema'
import { Exclude } from 'class-transformer'

export class OaData extends Resource {
  @Exclude({ toPlainOnly: true })
  readonly $name: string = 'OaData'
  @Exclude({ toPlainOnly: true })
  readonly $endpoint: string = '/User/OaData{/id}'

  @Exclude({ toPlainOnly: true })
  get $schema() {
    return OaDataSchema(this)
  }

  @Exclude({ toPlainOnly: true })
  get $id() {
    return this.idOaDataPk
  }
  set $id(val: ID) {
    this.idOaDataPk = val
  }

  @Exclude({ toPlainOnly: true })
  @ResponseSerialize(OaDataset)
  oaDataset: OaDataset | null = null

  @Exclude({ toPlainOnly: true })
  idOaDataPk: ID = 0

  @ValidationRequired()
  @ResponseSerialize(Number)
  value: number | null = null

  @ValidationRequired()
  @ResponseSerialize(String)
  dt: string = ''

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  active: boolean = false

  @Exclude({ toPlainOnly: true })
  get idOaDatasetFk() {
    if (!this.oaDataset) return 0
    return this.oaDataset.$id
  }
  set idOaDatasetFk(idOaDatasetFk: ID) {
    if (!this.oaDataset) this.oaDataset = new OaDataset()
    this.oaDataset.$id = idOaDatasetFk
  }

  constructor(dt: string = '', value: number | null = null) {
    super()
    this.value = value
    this.dt = dt
  }
}
