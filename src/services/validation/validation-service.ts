import {IPort} from '../../state-manager/port.model';
import {IState} from '../../state-manager/state.model';

export class ValidationService {

  checkIfPortUnique(port: IPort, entities: IPort[]): boolean {
    return this.checkIfPropertyUnique('id', port.id, entities) &&
      this.checkIfPropertyUnique('number', port.number, entities);
  }

  checkIfPropertyUnique(prop: string, value: string | number, entities: any[]): boolean {
    return !entities.find((entity) => entity[prop] === value);
  }
}