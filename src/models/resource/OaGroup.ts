/**
 * OaGroup
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'

/* TODO: review generated class */
export class OaGroup extends Resource {
  readonly $name: string = 'OaGroup'
  readonly $endpoint: string = '/User/OaGroup{/id}'

  get $id() {
    return this.idOaGroupPk
  }
  set $id(val: ID) {
    this.idOaGroupPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(OaGroup)
  parentGroup: OaGroup | null = null

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysisOaGroup: ObjectOfAnalysis[] = []

  idOaGroupPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  get idParentGroupFk() {
    if (!this.parentGroup) return 0
    return this.parentGroup.$id
  }
  set idParentGroupFk(idParentGroupFk: ID) {
    if (!this.parentGroup) this.parentGroup = new OaGroup()
    this.parentGroup.$id = idParentGroupFk
  }

  scheme(): any {
    return {
      parentGroup: this.parentGroup && this.parentGroup.$id,
      idOaGroupPk: this.idOaGroupPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      parentGroup: this.parentGroup && this.parentGroup.$id,
      idOaGroupPk: this.idOaGroupPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
