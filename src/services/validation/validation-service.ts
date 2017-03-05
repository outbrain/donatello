import {IPort} from '../../state-manager/port.model';

export class ValidationService {

  checkIfPortUniqe(port: IPort, entities: any[]): boolean {
    console.log(port)
    return this.checkIfPropertyUnique('id', port.id, entities) && 
      this.checkIfPropertyUnique('number', port.number, entities);
  }

  checkIfPropertyUnique(prop: string, value: string | number, entities: any[]): boolean {
    return entities.filter((entity) => entity[prop] === value).length === 0;
  }
}