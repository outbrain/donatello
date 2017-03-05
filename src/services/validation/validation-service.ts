import {IPort} from '../../state-manager/port.model';

export class ValidationService {

  checkIfPortUniqe(port: IPort, entities: any[]): boolean {
    return this.checkIfPropertyUnique('id', port.id, entities) &&
      this.checkIfPropertyUnique('name', port.name, entities);
  }

  checkIfPropertyUnique(prop: string, value: string | number, entities: any[]): boolean {
    return entities.filter((entity) => entity[prop] === value).length < 1;
  }
}