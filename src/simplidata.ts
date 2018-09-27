import Vue from 'vue'
import { $, HttpStatus, Lang } from 'simpli-ts-vue'
import VueResource, { HttpInterceptor, HttpOptions, HttpResponse } from 'vue-resource'

Vue.use(VueResource)

/* DEFAULT PROPERTIES *********************************************/
const defaultApiURL = 'http://simplidata.com:8080/api'
const defaultLang = Lang.EN_US
const defaultVersion = '1.0.0'
/******************************************************************/

export abstract class Simplidata {
  private static $apiURL: string = defaultApiURL
  private static $lang: Lang = defaultLang
  private static $version: string = defaultVersion
  private static $token?: string

  static init(httpInterceptor?: Function) {
    if (httpInterceptor) Simplidata.$httpInterceptor = httpInterceptor
    Vue.http.interceptors[7] = Simplidata.$httpInterceptor as HttpInterceptor
  }

  static get apiURL() {
    return Simplidata.$apiURL
  }

  static set apiURL(apiURL: string) {
    Simplidata.$apiURL = apiURL

    const regex = apiURL.match(/(.*)[^\/$]/g)
    if (regex) $.apiURL = regex[0] || ''
  }

  static get lang() {
    return Simplidata.$lang
  }

  static set lang(lang: Lang) {
    Simplidata.$lang = lang
  }

  static get version() {
    return Simplidata.$version
  }

  static set version(version: string) {
    Simplidata.$version = version
  }

  static get token() {
    return Simplidata.$token
  }

  static signIn(token: string) {
    Simplidata.$token = token
  }

  static signOut() {
    Simplidata.$token = undefined
  }

  static get httpInterceptor() {
    return Simplidata.$httpInterceptor
  }

  static get catchHandle() {
    return Simplidata.$catchHandle
  }

  static set catchHandle(catchHandle: Function) {
    Simplidata.$catchHandle = catchHandle
  }

  private static $httpInterceptor: Function = (request: HttpOptions, next: any) => {
    const { apiURL, lang, version, token, catchHandle } = Simplidata

    const regex = new RegExp(`^${apiURL}\\S*$`, 'g')
    const match = regex.exec(request.url || '')

    if (match) {
      request.headers.set('Accept-Language', lang)
      request.headers.set('X-Client-Version', `w${version}`) // w = web

      if (token) request.headers.set('Authorization', `Bearer ${token}`)
    }

    next(catchHandle)
  }

  private static $catchHandle: Function = (resp: HttpResponse) => {
    if (!resp.status) throw Error('Could not connect to server')
    else if (resp.status >= 400) {
      if (resp.status === HttpStatus.UNAUTHORIZED) {
        Simplidata.signOut()
        throw Error('Restricted Access')
      }

      throw Error(`${resp.status.toString()} - ${resp.data.message || resp.statusText}`)
    }
  }
}
