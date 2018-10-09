import { Resource } from 'simpli-web-sdk'
import {OaDataset} from './OaDataset'

export declare abstract class WithDataset extends Resource {
  abstract $dataset: OaDataset
}
