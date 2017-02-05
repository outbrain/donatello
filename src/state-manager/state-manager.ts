import {IState} from './state.model';
import {IPort} from './port.model';
import {IRoute} from './route.model';
import {IResponse} from './response.model';

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

  addRoute(portId: string, route: IRoute) {
    const port = this.getPort(portId);

    if (!port.routes) {
      port.routes = [];
    }

    port.routes.push({
      id: route.id,
      path: route.path,
      method: route.method,
      active: route.active
    });
  }

  addResponse(portId: string, routeId: string, response: IResponse) {
    const route = this.getRoute(portId, routeId);

    if (!route.responses) {
      route.responses = [];
    }

    route.responses.push({
      id: response.id,
      name: response.name,
      status: response.status,
      delay: response.delay,
      active: response.active,
      data: response.data
    });
  }

  getState(): IState {
    return this.state;
  }

  getPort(id: string): IPort {
    return this.state.ports.filter((port) => port.id === id)[0];
  }

  getRoute(portId: string, routeId: string): IRoute {
    return this.getPort(portId).routes.filter((route) => route.id === routeId)[0];
  }

  getResponse(portId: string, routeId: string, responseId): IResponse | undefined {
    return this.getRoute(portId, routeId).responses.filter((response) => response.id === responseId)[0];
  }
}