/**
 * PagarmePlan
 * @author ftgibran
 */
import { Model } from '../../simpli'
import { ValidationMax, ValidationMaxLength } from '../../simpli'
import { PaymentMethod } from '../../enums/PaymentMethod'

/* tslint:disable:variable-name */
export class PagarmePlan extends Model {
  id: string | null = null

  @ValidationMaxLength(255)
  name: string | null = null

  @ValidationMax(1000000)
  amount: number | null = null

  @ValidationMax(365)
  days: number | null = null

  @ValidationMax(365)
  trialDays: number | null = null

  paymentMethods: PaymentMethod[] = []

  color: string | null = null

  charges: number | null = null

  installments: number | null = null

  invoiceReminder: number | null = null

  paymentDeadlineChargesInterval: number | null = null
}
