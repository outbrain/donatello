import {IState} from './state.model';
import {IPort} from './port.model';
export class StateManager {
  private static instance: StateManager;
  private readonly state: IState = {
    ports: []
  };

  public static getInstance() {
    return StateManager.instance || (StateManager.instance = new StateManager());
  }

  addPort(port: IPort) {
    this.state.ports.push({
      id: port.id,
      name: port.name,
      number: port.number,
      active: port.active,
      proxy: port.proxy
    });
  }
}