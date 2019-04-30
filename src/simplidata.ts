import Simpli, { Lang, Currency, HttpStatus, FilterOptions, ComponentOptions, LocaleOptions } from 'simpli-web-sdk'
import Vue from 'vue'
import Popover from 'vue-js-popover'
import VueResource from 'vue-resource'
import { RouterOptions } from 'vue-router'
import { merge } from 'lodash'

import enUs from './locale/en-US/lang'
import ptBr from './locale/pt-BR/lang'

Vue.use(Popover)

/* DEFAULT PROPERTIES *********************************************/
const defaultApiURL = 'http://simplidata.com:8080/api'
const defaultModelingURL = 'http://54.94.212.20:32797/modeling/'
const defaultLang = Lang.EN_US
const defaultCurrency: Currency = Currency.USD
const defaultVersion = '1.0.0'

const defaultLocale = {
  [Lang.EN_US]: enUs,
  [Lang.PT_BR]: ptBr,
}

const defaultHttpInterception = (request: VueResource.HttpOptions, next: any) => {
  const { apiURL, modelingURL, lang, version, getToken, catchHandle } = SimpliData

  const regex = new RegExp(`^${apiURL}\\S*$`, 'g')
  const match = regex.exec(request.url || '')

  if (match) {
    request.headers.set('Accept-Language', lang)
    request.headers.set('X-Client-Version', `w${version}`) // w = web

    if (getToken()) request.headers.set('Authorization', `Bearer ${getToken()}`)
  }

  next(catchHandle)
}

const defaultCatchHandle = (resp: VueResource.HttpResponse) => {
  if (!resp.status) throw Error('Could not connect to server')
  else if (resp.status >= 400) {
    if (resp.status === HttpStatus.UNAUTHORIZED) {
      SimpliData.signOut()
      throw Error('Restricted Access')
    }

    throw Error(`${resp.status.toString()} - ${resp.data.message || resp.statusText}`)
  }
}

/******************************************************************/

export abstract class SimpliData {
  static apiURL: string = defaultApiURL
  static modelingURL: string = defaultModelingURL
  static httpInterceptor: Function = defaultHttpInterception
  static lang: Lang = defaultLang
  static currency: Currency = defaultCurrency
  static components: ComponentOptions = {}
  static filters: FilterOptions = {}
  static locale: LocaleOptions = {}
  static router?: RouterOptions
  static version: string = defaultVersion
  static catchHandle: Function = defaultCatchHandle

  static init() {
    const { apiURL, httpInterceptor, lang, currency, components, filters, router, locale } = SimpliData

    Simpli.apiURL = apiURL
    Simpli.httpInterceptor = httpInterceptor
    Simpli.lang = lang
    Simpli.currency = currency
    Simpli.components = components
    Simpli.filters = filters
    Simpli.locale = merge(locale, defaultLocale)
    Simpli.router = router

    Simpli.init()
  }

  static getToken() {
    return SimpliData.$token
  }

  static signIn(token: string) {
    SimpliData.$token = token
  }

  static signOut() {
    SimpliData.$token = undefined
  }
  private static $token?: string
}
