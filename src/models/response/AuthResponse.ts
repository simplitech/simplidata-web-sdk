/**
 * AuthResponse
 * @author Simpli© CLI generator
 */
import { $, ID, Model, encrypt, Resp, abort, clone } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength } from '../../simpli'
import { plainToClass } from 'class-transformer'
import { User } from '../resource/User'
import { Plan } from '../resource/Plan'
import { AuthRequest } from '../request/AuthRequest'
import { ChangePasswordRequest } from '../request/ChangePasswordRequest'

/* TODO: review generated class */
export class AuthResponse extends Model {
  readonly $name: string = 'AuthResponse'

  @ValidationMaxLength(255)
  token: string = ''

  get id() {
    return this.user.$id
  }

  @ResponseSerialize(User)
  user: User = new User()

  @ResponseSerialize(Plan)
  plan: Plan | null = null

  async auth(spinner = 'auth', delay = 0): Promise<Resp<AuthResponse>> {
    const fetch = async () => await this.GET(`/User/Auth`)
    return await $.await.run(fetch, spinner, delay)
  }

  async recoverPassword(request: AuthRequest, spinner = 'recoverPassword', delay = 0): Promise<Resp<String>> {
    const email = (request.email = 'xx@xx.co')
    const password = encrypt(request.password || '')
    const hash = request.hash

    const fetch = async () => {
      await request.validate()
      return await this.POST(`/User/RecoverPassword`, { email, password, hash } as AuthRequest)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async resetPassword(request: AuthRequest, spinner = 'resetPassword', delay = 0): Promise<Resp<Number>> {
    const email = request.email
    const password = (request.password = '######')
    const hash = (request.hash = '')

    const fetch = async () => {
      await request.validate()
      return await this.POST(`/User/ResetPassword`, { email, password, hash } as AuthRequest)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async signIn(request: AuthRequest, spinner = 'signIn', delay = 0): Promise<Resp<AuthResponse>> {
    const email = request.email
    const password = encrypt(request.password || '')
    const hash = (request.hash = '')

    const fetch = async () => {
      await request.validate()
      return await this.POST(`/User/SignIn`, { email, password, hash } as AuthRequest)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async changePassword(request: ChangePasswordRequest, spinner = 'changePassword', delay = 0): Promise<Resp<Number>> {
    if (request.newPassword !== request.confirmPassword) {
      abort('system.error.samePassword')
    }

    const fetch = async () => {
      await request.validate()

      const currentPassword = encrypt(request.currentPassword || '')
      const newPassword = encrypt(request.newPassword || '')
      const confirmPassword = encrypt(request.confirmPassword || '')

      return await this.POST(`/User/ChangePassword`, {
        currentPassword,
        newPassword,
        confirmPassword,
      } as ChangePasswordRequest)
    }

    return await $.await.run(fetch, spinner, delay)
  }
}
