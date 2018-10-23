/**
 * OaVersion
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { OaVersionStatus } from './OaVersionStatus'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaDataset } from './OaDataset'

/* TODO: review generated class */
export class OaVersion extends Resource {
  readonly $name: string = 'OaVersion'
  readonly $endpoint: string = '/User/OaVersion{/id}'

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

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysis: ObjectOfAnalysis | null = null

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

  get idObjectOfAnalysisFk() {
    if (!this.objectOfAnalysis) return 0
    return this.objectOfAnalysis.$id
  }
  set idObjectOfAnalysisFk(idObjectOfAnalysisFk: ID) {
    if (!this.objectOfAnalysis) this.objectOfAnalysis = new ObjectOfAnalysis()
    this.objectOfAnalysis.$id = idObjectOfAnalysisFk
  }

  scheme(): any {
    return {
      oaVersionStatus: this.oaVersionStatus && this.oaVersionStatus.$id,
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
      idOaVersionPk: this.idOaVersionPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      oaVersionStatus: this.oaVersionStatus && this.oaVersionStatus.$id,
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
      idOaVersionPk: this.idOaVersionPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
