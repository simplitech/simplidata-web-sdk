/**
 * LoginResp
 * @author Simpli© CLI generator
 */
import { $, ID, Model, encrypt, Resp } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength } from 'simpli-web-sdk'
import { User } from '../resource/User'
import { LoginSerialized } from '../LoginSerialized'

/* TODO: review generated class */
export class LoginResp extends Model {
  @ValidationMaxLength(255)
  token: string = ''

  id: ID = 0

  @ResponseSerialize(User)
  user: User = new User()

  async auth(spinner = 'auth', delay = 0): Promise<Resp<LoginResp>> {
    const fetch = async () => await this.GET(`/User/Auth`)
    return await $.await.run(fetch, spinner, delay)
  }

  async recoverPassword(model: LoginSerialized, spinner = 'recoverPassword', delay = 0): Promise<Resp<String>> {
    const email = (model.email = 'xx@xx.co')
    const password = encrypt(model.password || '')
    const hash = model.hash

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/RecoverPassword`, { email, password, hash } as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async resetPassword(model: LoginSerialized, spinner = 'resetPassword', delay = 0): Promise<Resp<Number>> {
    const email = model.email
    const password = (model.password = '######')
    const hash = (model.hash = '')

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/ResetPassword`, { email, password, hash } as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async signIn(model: LoginSerialized, spinner = 'signIn', delay = 0): Promise<Resp<LoginResp>> {
    const email = model.email
    const password = encrypt(model.password || '')
    const hash = (model.hash = '')

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/SignIn`, { email, password, hash } as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }
}
