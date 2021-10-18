declare module "readline" {
  interface Interface {
    // eslint-disable-next-line @typescript-eslint/ban-types
    commands: { [key: string]: Function };
    clearLine(): void;
  }
}