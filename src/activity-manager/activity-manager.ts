import {StateManager} from '../state-manager/state-manager';

export class ActivityManager {
  private static instance: ActivityManager;
  private readonly stateManager = StateManager.getInstance();

  public static getInstance() {
    return ActivityManager.instance || (ActivityManager.instance = new ActivityManager());
  }

  restart() {

  }

  foo() {

  }
}