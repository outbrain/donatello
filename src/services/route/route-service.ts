import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {ResponseService} from '../response/response-service';

export class RouteService {
  private readonly stateManager = StateManager.getInstance();
  private readonly responseService = new ResponseService();

  get(portId: string, routeId: string): IRoute {
    return this.stateManager.getRoute(portId, routeId);
  }

  getAllByPortId(portId: string) {
    return this.stateManager.getRoutes(portId);
  }

  createRoute(portId: string, route: IRoute) {
    this.stateManager.addRoute(portId, route);
    if (route.responses) {
      route.responses.forEach((response) => {
        this.responseService.create(portId, route.id, response);
      });
    }
  }

  update(portId: string, routeId: string, route: IRoute) {
    this.stateManager.updateRoute(portId, routeId, route);
  }

  remove(portId: string, routeId: string) {
    this.stateManager.removeRoute(portId, routeId);
  }

  activateRoute(portId: string, routeId: string) {
    this.stateManager.activateRoute(portId, routeId);
  }

  deactivateRoute(portId: string, routeId: string) {
    this.stateManager.deactivateRoute(portId, routeId);
  }
}