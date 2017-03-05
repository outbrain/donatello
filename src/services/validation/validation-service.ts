import {IPort} from '../../state-manager/port.model';

export class ValidationService {

  checkIfPortUniqe(port: IPort, entities: any[]): boolean {
<<<<<<< HEAD
    return this.checkIfPropertyUnique('id', port.id, entities) &&
=======
    console.log(port)
    return this.checkIfPropertyUnique('id', port.id, entities) && 
>>>>>>> bd0497a2c97d3307e6039bc2e3e0c4110c9d1011
      this.checkIfPropertyUnique('number', port.number, entities);
  }

  checkIfPropertyUnique(prop: string, value: string | number, entities: any[]): boolean {
    return entities.filter((entity) => entity[prop] === value).length === 0;
  }
}