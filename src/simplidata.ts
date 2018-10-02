import Simpli, { HttpStatus, Lang, LocaleOptions } from 'simpli-web-sdk'
import { HttpOptions, HttpResponse } from 'vue-resource'

import enUs from './locale/en-US/lang'
import ptBr from './locale/pt-BR/lang'

const merge = require('lodash.merge')

/* DEFAULT PROPERTIES *********************************************/
const defaultApiURL = 'http://simplidata.com:8080/api'
const defaultLang = Lang.EN_US
const defaultVersion = '1.0.0'

const defaultLocale = {
  [Lang.EN_US]: enUs,
  [Lang.PT_BR]: ptBr,
}

const defaultHttpInterception = (request: HttpOptions, next: any) => {
  const { apiURL, lang, version, getToken, catchHandle } = Simplidata

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
      Simplidata.signOut()
      throw Error('Restricted Access')
    }

    throw Error(`${resp.status.toString()} - ${resp.data.message || resp.statusText}`)
  }
}

/******************************************************************/

export abstract class Simplidata {
  private static $token?: string

  static apiURL: string = defaultApiURL
  static lang: Lang = defaultLang
  static locale: LocaleOptions = {}
  static version: string = defaultVersion
  static httpInterceptor: Function = defaultHttpInterception
  static catchHandle: Function = defaultCatchHandle

  static init() {
    const { apiURL, lang, locale, httpInterceptor } = Simplidata

    Simpli.apiURL = apiURL
    Simpli.lang = lang
    Simpli.locale = merge(locale, defaultLocale)
    Simpli.httpInterceptor = httpInterceptor

    Simpli.init()
  }

  static getToken() {
    return Simplidata.$token
  }

  static signIn(token: string) {
    Simplidata.$token = token
  }

  static signOut() {
    Simplidata.$token = undefined
  }
}
