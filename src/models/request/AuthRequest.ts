/**
 * AuthRequest
 * @author Simpli© CLI generator
 */
import { Model } from 'simpli-web-sdk'
import { ResponseHidden, ValidationEmail, ValidationMaxLength, ValidationPasswordLength } from 'simpli-web-sdk'

/* TODO: review generated class */
export class AuthRequest extends Model {
  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string | null = null

  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  password: string | null = null

  @ValidationMaxLength(255)
  hash: string | null = null
}
