/**
 * LoginResp
 * @author Simpli© CLI generator
 */
import { ID, Model, encrypt, Resp } from 'simpli-ts-vue'
import { ResponseSerialize, ValidationMaxLength } from 'simpli-ts-vue'
import { User } from '../resource/User'
import { LoginSerialized } from '../LoginSerialized'

/* TODO: review generated class */
export class LoginResp extends Model {
  @ValidationMaxLength(255)
  token: string = ''

  id: ID = 0

  @ResponseSerialize(User)
  user: User = new User()

  async auth(): Promise<Resp<LoginResp>> {
    return await this.GET(`/User/Auth`)
  }

  async recoverPassword(model: LoginSerialized): Promise<Resp<String>> {
    const email = (model.email = 'xx@xx.co')
    const password = encrypt(model.password || '')
    const hash = model.hash

    await model.validate()
    return await this.POST(`/User/RecoverPassword`, { email, password, hash } as LoginSerialized)
  }

  async resetPassword(model: LoginSerialized): Promise<Resp<Number>> {
    const email = model.email
    const password = (model.password = '######')
    const hash = (model.hash = '')

    await model.validate()
    return await this.POST(`/User/ResetPassword`, { email, password, hash } as LoginSerialized)
  }

  async signIn(model: LoginSerialized): Promise<Resp<LoginResp>> {
    const email = model.email
    const password = encrypt(model.password || '')
    const hash = (model.hash = '')

    await model.validate()
    return await this.POST(`/User/SignIn`, { email, password, hash } as LoginSerialized)
  }
}
