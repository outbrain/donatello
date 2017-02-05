import {IRoute} from './route.model';

export interface IPort {
  id: string;
  number: number;
  name: string;
  active: boolean;
  proxy: any;
  routes: IRoute[];
}   
