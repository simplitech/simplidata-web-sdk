import { Http } from 'vue-resource'

declare module 'vue/types/vue' {
  interface VueConstructor {
    http: Http
  }
}
