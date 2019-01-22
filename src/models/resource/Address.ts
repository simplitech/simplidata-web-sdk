/**
 * Address
 * @author Simpli CLI generator
 */
import { $, ID, Resource, HttpBody, Resp } from '../../simpli'
import { ValidationCEP, ValidationMaxLength, ValidationRequired } from '../../simpli'
import AddressSchema from '../../schemas/Address.schema'

export class Address extends Resource {
  readonly $name: string = 'Address'
  readonly $endpoint: string = '/User/Address{/id}'
  readonly $googleApiKey: string = `AIzaSyBlx9aOau9G-Y66iDjM2_eCKAm_3b-Zpmk`

  get $schema() {
    return AddressSchema(this)
  }

  get $id() {
    return this.idAddressPk
  }
  set $id(val: ID) {
    this.idAddressPk = val
  }

  idAddressPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(255)
  @ValidationCEP()
  zipcode: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  street: string = ''

  @ValidationMaxLength(255)
  number: string | null = null

  @ValidationMaxLength(255)
  complement: string | null = null

  @ValidationRequired()
  @ValidationMaxLength(255)
  city: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  state: string = ''

  @ValidationRequired()
  latitude: number = 0

  @ValidationRequired()
  longitude: number = 0

  active: boolean | null = null

  get stringfy() {
    return `${this.street}, ${this.number} ${this.complement} - ${this.zipcode} / ${this.city} - ${this.state} Brasil`
  }

  async populateFromCEP(spinner = 'populateFromCEP'): Promise<Resp<any>> {
    if (this.zipcode.length !== 8) throw new Error('Invalid CEP')

    const fetch = async () => {
      const resp = await new HttpBody<any>(Object).GET(`//viacep.com.br/ws/${this.zipcode}/json/`, {}, false)
      const data = resp.data

      if (!this.street) this.street = data.logradouro || ''
      if (!this.city) this.city = data.localidade || ''
      if (!this.state) this.state = data.uf || ''

      return resp
    }

    return await $.await.run(fetch, spinner)
  }

  async populateLatLng(spinner = 'populateLatLng'): Promise<Resp<any>> {
    const params = {
      address: this.stringfy,
      key: this.$googleApiKey,
      sensor: false,
    }

    const fetch = async () => {
      const resp = await new HttpBody<any>(Object).GET(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        { params },
        false
      )
      const data = resp.data

      if (data && data.results.length) {
        const lat = data.results[0].geometry.location.lat
        const lng = data.results[0].geometry.location.lng

        this.latitude = lat
        this.longitude = lng
        return resp
      }

      throw new Error('Error in getting latitude and longitude')
    }

    return await $.await.run(fetch, spinner)
  }
}
