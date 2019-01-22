/**
 * RecoverPasswordRequest
 * @author Simpli CLI generator
 */
import { Model, ValidationRequired, ValidationPasswordLength } from '../../simpli'

export default class RecoverPasswordRequest extends Model {
  readonly $name: string = 'RecoverPasswordRequest'

  @ValidationRequired()
  @ValidationPasswordLength(6, 100)
  newPassword: string | null = null

  @ValidationRequired()
  @ValidationPasswordLength(6, 100)
  confirmPassword: string | null = null

  @ValidationRequired()
  hash: string | null = null
}
