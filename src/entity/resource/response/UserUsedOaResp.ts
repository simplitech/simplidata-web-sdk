/**
 * UserUsedOaResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  async persistUserUsedOa(model: UserUsedOa, spinner = 'persistUserUsedOa'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/UserUsedOa`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getUserUsedOa(
    idUserFk: number,
    idObjectOfAnalysisFk: number,
    spinner = 'getUserUsedOa'
  ): Promise<Resp<UserUsedOaResp>> {
    const fetch = async () => await this.GET(`/User/UserUsedOa/${idUserFk}/${idObjectOfAnalysisFk}`)
    return await $.await.run(fetch, spinner)
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
