/**
 * LoginHolder
 * @author Simpli© CLI generator
 */
import { Model } from 'simpli-ts-vue'
import { ResponseHidden, ValidationEmail, ValidationMaxLength, ValidationPasswordLength } from 'simpli-ts-vue'

/* TODO: review generated class */
export class LoginSerialized extends Model {
  readonly $name: string = 'LoginSerialized'

  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string | null = null

  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  password: string | null = null

  @ValidationMaxLength(255)
  hash: string | null = null
}
