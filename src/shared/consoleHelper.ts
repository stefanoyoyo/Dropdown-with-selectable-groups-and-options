
/**Class logging anything in the console, allowing toapply some tricks. */
export class ConsoleHelper {

  /**Logs can be effectively logged or not. */
  canShowLogs: boolean = true;

  constructor(config: ConsoleHelperConfig) {
    this.canShowLogs = config.canShowLogs;
  }

  log(obj: any) {
    if (!this.canShowLogs) return;
    console.log(obj);
  }

}

export interface ConsoleHelperConfig {
  canShowLogs: boolean;
}
