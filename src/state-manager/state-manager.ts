export class StateManager {
  private static instance: StateManager;

  public static getInstance() {
    return StateManager.instance || (StateManager.instance = new StateManager());
  }
}