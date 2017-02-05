import * as express from 'express';
import {StateManager} from '../state-manager/state-manager';

export class ActivityManager {
  private static instance: ActivityManager;
  private readonly stateManager = StateManager.getInstance();

  public static getInstance() {
    return ActivityManager.instance || (ActivityManager.instance = new ActivityManager());
  }

  startActivities() {
    const state = this.stateManager.getState();
    state.ports
      .filter(port => port.active)
      .forEach((port) => {
        const app: express.Application = express();
        app.listen(port.number, () => {
          console.log(`start listening ${port.name} on ${port.number}`);
        });
        port.routes.forEach((route) => {
        })
      })
  }

  stopActivities() {

  }
}