import {IResponse} from '../response/response.model'

export interface IRoute {
  id: string;
  path: RegExp;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  active: boolean;
  responses: IResponse[];
}