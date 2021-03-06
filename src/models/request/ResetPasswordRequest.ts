/**
 * ResetPasswordRequest
 * @author Simpli CLI generator
 */
import { Model, ValidationRequired, ValidationEmail } from '../../simpli'

export default class ResetPasswordRequest extends Model {
  readonly $name: string = 'ResetPasswordRequest'

  @ValidationRequired()
  @ValidationEmail()
  email: string | null = null
}
