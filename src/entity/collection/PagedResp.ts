/**
 * PagedResp
 * @author Simpli© CLI generator
 */
import { PageCollection, Resource, ResponseFill } from 'simpli-ts-vue'
import { Type } from 'class-transformer'

export class PagedResp<T extends Resource> extends PageCollection<T> {
  @ResponseFill('list')
  @Type(options => (options!.newObject as PagedResp<T>).type)
  items: T[] = []

  set recordsTotal(val: number) {
    this.total = val
  }
}
