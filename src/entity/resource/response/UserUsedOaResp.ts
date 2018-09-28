/**
 * UserUsedOaResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { UserUsedOa } from '../UserUsedOa'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'
import { User } from '../User'

/* TODO: review generated class */
export class UserUsedOaResp extends Resource {
  readonly $endpoint: string = '/User/UserUsedOa{/idUserFk}{/idObjectOfAnalysisFk}'

  get $id() {
    return this.userUsedOa.$id
  }
  set $id(val: ID) {
    this.userUsedOa.$id = val
  }
  get $tag() {
    return this.userUsedOa.$tag
  }
  set $tag(val: TAG) {
    this.userUsedOa.$tag = val
  }

  @ResponseSerialize(UserUsedOa)
  userUsedOa: UserUsedOa = new UserUsedOa()

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  @ResponseSerialize(User)
  allUser: User[] = []

  async persistUserUsedOa(model: UserUsedOa): Promise<Resp<Number>> {
    return await this.POST(`/User/UserUsedOa`, model)
  }

  async getUserUsedOa(idUserFk: number, idObjectOfAnalysisFk: number): Promise<Resp<UserUsedOaResp>> {
    return await this.GET(`/User/UserUsedOa/${idUserFk}/${idObjectOfAnalysisFk}`)
  }

  scheme() {
    return {
      userUsedOa: this.userUsedOa && this.userUsedOa.$id,
    }
  }

  csvScheme() {
    return {
      userUsedOa: this.userUsedOa && this.userUsedOa.$id,
    }
  }
}
