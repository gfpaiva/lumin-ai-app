export interface InitializationPort {
  /**
   * Initializes the application.
   * Resolves when the initialization is complete.
   */
  initialize(): Promise<void>;
}
