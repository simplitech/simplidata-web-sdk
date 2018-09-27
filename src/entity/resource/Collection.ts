/**
 * Collection
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool, datetime } from 'simpli-ts-vue'
import { User } from './User'

/* TODO: review generated class */
export class Collection extends Resource {
  readonly $name: string = 'Collection'
  readonly $endpoint: string = '/User/Collection{/id}'

  get $id() {
    return this.idCollectionPk
  }
  set $id(val: ID) {
    this.idCollectionPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(User) user: User | null = null

  idCollectionPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired() creationDate: string = ''

  @ValidationRequired() active: boolean = false

  get idUserFk() {
    if (!this.user) return 0
    return this.user.$id
  }
  set idUserFk(idUserFk: ID) {
    if (!this.user) this.user = new User()
    this.user.$id = idUserFk
  }

  scheme() {
    return {
      user: this.user && this.user.$id,
      idCollectionPk: this.idCollectionPk,
      title: this.title,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      user: this.user && this.user.$id,
      idCollectionPk: this.idCollectionPk,
      title: this.title,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }
}
