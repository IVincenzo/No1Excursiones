export class ProviderNotConfiguredError extends Error {
  constructor(provider: string) {
    super(`${provider} booking provider is not configured`);
    this.name = "ProviderNotConfiguredError";
  }
}
