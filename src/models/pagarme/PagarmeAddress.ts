/**
 * PagarmeAddress
 * @author ftgibran
 */
import { $, Model, HttpBody } from '../../simpli'
import { ValidationRequired, ValidationMax, ValidationMaxLength } from '../../simpli'

/* tslint:disable:variable-name */
export class PagarmeAddress extends Model {
  readonly $name: string = 'PagarmeAddress'

  @ValidationRequired()
  street: string | null = null

  @ValidationRequired()
  street_number: string | null = null

  complementary: string | null = null

  @ValidationRequired()
  neighborhood: string | null = null

  @ValidationRequired()
  zipcode: string | null = null

  city: string | null = null

  state: string | null = null

  country: string | null = 'Brasil'

  get stringfy() {
    return `${this.street}, ${this.street_number} ${this.complementary} - ${this.zipcode} / ${this.city} - ${
      this.state
    } ${this.country}`
  }

  async populateFromCEP(spinner = 'populateFromCEP') {
    if (!this.zipcode || this.zipcode.length !== 8) throw new Error('Invalid CEP')

    const fetch = async () => {
      const resp = await new HttpBody<any>(Object).GET(`//viacep.com.br/ws/${this.zipcode}/json/`, {}, false)
      const data = resp.data

      if (!this.street) this.street = data.logradouro || ''
      if (!this.neighborhood) this.neighborhood = data.bairro || ''
      if (!this.city) this.city = data.localidade || ''
      if (!this.state) this.state = data.uf || ''

      return resp
    }

    return await $.await.run(fetch, spinner)
  }
}
