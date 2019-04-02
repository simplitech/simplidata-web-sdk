/**
 * OaGroup
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG, ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
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

  @ResponseSerialize(OaGroup)
  childrenGroups: OaGroup[] = []

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

  areAllMyChildrenInList(list: ObjectOfAnalysis[]): boolean {
    return (
      (this.objectOfAnalysisOaGroup.length > 0 || this.childrenGroups.length > 0) &&
      this.objectOfAnalysisOaGroup.every(oa => list.includes(oa)) &&
      this.childrenGroups.every(child => child.areAllMyChildrenInList(list))
    )
  }

  addAllMyChildrenToTheList(list: ObjectOfAnalysis[]) {
    this.objectOfAnalysisOaGroup.forEach(oa => {
      if (!list.includes(oa)) {
        list.push(oa)
      }
    })
    this.childrenGroups.forEach(child => {
      child.addAllMyChildrenToTheList(list)
    })
  }

  removeAllMyChildrenToTheList(list: ObjectOfAnalysis[]) {
    this.objectOfAnalysisOaGroup.forEach(oa => {
      const index = list.indexOf(oa)
      if (index > -1) {
        list.splice(index, 1)
      }
    })
    this.childrenGroups.forEach(child => {
      child.removeAllMyChildrenToTheList(list)
    })
  }
}
