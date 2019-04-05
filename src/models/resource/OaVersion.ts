/**
 * OaVersion
 * @author Simpli CLI generator
 */
import { ID, Model, TAG } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { OaVersionStatus } from './OaVersionStatus'
import { OaDataset } from './OaDataset'
import OaVersionSchema from '../../schemas/OaVersion.schema'

export class OaVersion extends Model {
  readonly $name: string = 'OaVersion'
  readonly $endpoint: string = '/User/OaVersion{/id}'

  get $schema() {
    return OaVersionSchema(this)
  }

  get $id() {
    return this.idOaVersionPk
  }
  set $id(val: ID) {
    this.idOaVersionPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(OaVersionStatus)
  oaVersionStatus: OaVersionStatus | null = null

  @ResponseSerialize(OaDataset)
  lastDataset: OaDataset | null = null // last dataset saved for this version

  idOaVersionPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  get idOaVersionStatusFk() {
    if (!this.oaVersionStatus) return 0
    return this.oaVersionStatus.$id
  }
  set idOaVersionStatusFk(idOaVersionStatusFk: ID) {
    if (!this.oaVersionStatus) this.oaVersionStatus = new OaVersionStatus()
    this.oaVersionStatus.$id = idOaVersionStatusFk
  }
}
