/**
 * OaGroup
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import OaGroupSchema from '../../schemas/OaGroup.schema'

export class OaGroup extends Resource {
  readonly $name: string = 'OaGroup'
  readonly $endpoint: string = '/User/OaGroup{/id}'

  get $schema() {
    return OaGroupSchema(this)
  }

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
}
