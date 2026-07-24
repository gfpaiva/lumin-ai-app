import { InitializationPort } from "@/src/common/ports/initialization.port";

export class InitializationSimulatorAdapter implements InitializationPort {
  private timeoutMs: number;

  constructor(timeoutMs = 3000) {
    this.timeoutMs = timeoutMs;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.timeoutMs);
    });
  }
}

export const initializationSimulatorAdapter =
  new InitializationSimulatorAdapter();
