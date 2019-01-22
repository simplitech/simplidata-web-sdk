/**
 * SubscriptionRequest
 * @author Simpli CLI generator
 */
import { Model } from '../../simpli'
import { ResponseSerialize, ValidationEmail, ValidationMaxLength, ValidationPasswordLength } from '../../simpli'
import { PagarmeCard } from '../pagarme/PagarmeCard'
import { PagarmeSubscription } from '../pagarme/PagarmeSubscription'

export class SubscriptionResponse extends Model {
  readonly $name: string = 'SubscriptionResponse'

  @ResponseSerialize(PagarmeSubscription)
  subscription: PagarmeSubscription = new PagarmeSubscription()

  @ResponseSerialize(PagarmeCard)
  card: PagarmeCard = new PagarmeCard()

  idPlanSignature: number | null = null
}
