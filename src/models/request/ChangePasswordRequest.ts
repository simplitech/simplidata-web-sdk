/**
 * ChangePasswordRequest
 * @author ftgibran
 */
import { Model } from '../../simpli'
import { $, Resp, ResponseHidden, ValidationPasswordLength } from '../../simpli'

export class ChangePasswordRequest extends Model {
  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  currentPassword: string | null = null

  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  newPassword: string | null = null

  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  confirmPassword: string | null = null
}
