/**
 * UserUsedOa
 * @author Simpli© CLI generator
 */
import { ID, Resource } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationRequired } from 'simpli-web-sdk'
import { datetime } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { User } from './User'

/* TODO: review generated class */
export class UserUsedOa extends Resource {
  readonly $name: string = 'UserUsedOa'
  readonly $endpoint: string = '/User/UserUsedOa{/idUserFk}{/idObjectOfAnalysisFk}'

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

  scheme(): any {
    return {
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
      user: this.user && this.user.$id,
    }
  }

  csvScheme(): any {
    return {
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
      user: this.user && this.user.$id,
    }
  }
}
