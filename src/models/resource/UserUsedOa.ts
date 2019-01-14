/**
 * UserUsedOa
 * @author Simpli CLI generator
 */
import { ID, Resource } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { User } from './User'
import UserUsedOaSchema from '../../schemas/UserUsedOa.schema'

/* TODO: review generated class */
export class UserUsedOa extends Resource {
  readonly $name: string = 'UserUsedOa'
  readonly $endpoint: string = '/User/UserUsedOa{/idUserFk}{/idObjectOfAnalysisFk}'

  get $schema() {
    return UserUsedOaSchema(this)
  }

  get $id() {
    /* TODO: define the ID */
    return 0
  }
  set $id(val: ID) {
    /* TODO: define the ID */
  }

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysis: ObjectOfAnalysis | null = null

  @ResponseSerialize(User)
  user: User | null = null

  // @ValidationRequired()
  // usedDate: string = ''

  get idUserFk() {
    if (!this.user) return 0
    return this.user.$id
  }
  set idUserFk(idUserFk: ID) {
    if (!this.user) this.user = new User()
    this.user.$id = idUserFk
  }

  get idObjectOfAnalysisFk() {
    if (!this.objectOfAnalysis) return 0
    return this.objectOfAnalysis.$id
  }
  set idObjectOfAnalysisFk(idObjectOfAnalysisFk: ID) {
    if (!this.objectOfAnalysis) this.objectOfAnalysis = new ObjectOfAnalysis()
    this.objectOfAnalysis.$id = idObjectOfAnalysisFk
  }
}
