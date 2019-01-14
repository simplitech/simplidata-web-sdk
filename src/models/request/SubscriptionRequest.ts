/**
 * SubscriptionRequest
 * @author Simpli CLI generator
 */
import { Model } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { PagarmeCard } from '../pagarme/PagarmeCard'

/* TODO: review generated class */
export class SubscriptionRequest extends Model {
  readonly $name: string = 'SubscriptionRequest'

  @ResponseSerialize(PagarmeCard)
  card: PagarmeCard | null = new PagarmeCard()

  pagarmePlanId: string | null = null
}
