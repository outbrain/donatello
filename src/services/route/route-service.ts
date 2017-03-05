import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {ResponseService} from '../response/response-service';

export class RouteService {
  private readonly stateManager = StateManager.getInstance();
  private readonly responseService = new ResponseService();

  get(portId: string, routeId: string): IRoute {
    return this.stateManager.getRoute(portId, routeId);
  }

  create(portId: string, route: IRoute) {
    this.stateManager.addRoute(portId, route);
    route.responses.forEach((response) => {
      this.responseService.create(portId, route.id, response);
    });
  }

  update(route: IRoute) {
    //this.stateManager.updateRoute(route);
  }

  remove(routeId: string) {
    //this.stateManager.removeRoute(routeId);
  }
}
