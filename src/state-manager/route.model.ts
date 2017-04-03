import {IResponse} from './response.model';
import {TVerb} from '../main';

export interface IRoute {
  id?: string;
  path?: string;
  method?: TVerb;
  active?: boolean;
  responses?: IResponse[];
}