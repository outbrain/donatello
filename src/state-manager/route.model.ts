import {IResponse} from './response.model';

export interface IRoute {
  id?: string;
  path?: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  active?: boolean;
  responses?: IResponse[];
}