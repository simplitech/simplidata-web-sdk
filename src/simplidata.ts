import Vue from 'vue'
import Popover from 'vue-js-popover'
import Simpli, { Lang, Currency, HttpStatus, FilterOptions, ComponentOptions, LocaleOptions } from 'simpli-web-sdk'
import VueResource, { HttpOptions, HttpResponse } from 'vue-resource'
import { RouterOptions } from 'vue-router'

import enUs from './locale/en-US/lang'
import ptBr from './locale/pt-BR/lang'

const merge = require('lodash.merge')

Vue.use(Popover)

/* DEFAULT PROPERTIES *********************************************/
const defaultApiURL = 'http://simplidata.com:8080/api'
const defaultLang = Lang.EN_US
const defaultCurrency: Currency = Currency.USD
const defaultVersion = '1.0.0'

const defaultLocale = {
  [Lang.EN_US]: enUs,
  [Lang.PT_BR]: ptBr,
}

const defaultHttpInterception = (request: HttpOptions, next: any) => {
  const { apiURL, lang, version, getToken, catchHandle } = SimpliData

  const regex = new RegExp(`^${apiURL}\\S*$`, 'g')
  const match = regex.exec(request.url || '')

  if (match) {
    request.headers.set('Accept-Language', lang)
    request.headers.set('X-Client-Version', `w${version}`) // w = web

    if (getToken()) request.headers.set('Authorization', `Bearer ${getToken()}`)
  }

  next(catchHandle)
}

const defaultCatchHandle = (resp: HttpResponse) => {
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
