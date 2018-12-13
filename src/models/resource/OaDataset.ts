/**
 * OaDataset
 * @author Simpli© CLI generator
 */
import { ID, Resource } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { OaVersion } from './OaVersion'
import { OaData } from './OaData'
import OaDatasetSchema from '../../schemas/OaDataset.schema'

/* TODO: review generated class */
export class OaDataset extends Resource {
  readonly $name: string = 'OaDataset'
  readonly $endpoint: string = '/User/OaDataset{/id}'

  get $schema() {
    return OaDatasetSchema(this)
  }

  get $id() {
    return this.idOaDatasetPk
  }
  set $id(val: ID) {
    this.idOaDatasetPk = val
  }

  @ResponseSerialize(OaVersion)
  oaVersion: OaVersion | null = null

  @ResponseSerialize(OaData)
  oaDataList: OaData[] = []

  idOaDatasetPk: ID = 0

  @ValidationRequired()
  creationDate: string = ''

  @ValidationRequired()
  active: boolean = false

  get idOaVersionFk() {
    if (!this.oaVersion) return 0
    return this.oaVersion.$id
  }
  set idOaVersionFk(idOaVersionFk: ID) {
    if (!this.oaVersion) this.oaVersion = new OaVersion()
    this.oaVersion.$id = idOaVersionFk
  }
}
