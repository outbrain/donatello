export class StateManager {
  private static
  instance: StateManager;

  public static get Instance() {
    return StateManager.instance || (StateManager.instance = new StateManager());
  }
}