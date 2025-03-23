type Variadic = (...args: any[]) => void;
export const GraceLogLevel = {
  mute: 0,
  log: 1,
  debug: 2,
  verbose: 3,
} as const;
export type GraceLogLevel = (typeof GraceLogLevel)[keyof typeof GraceLogLevel];

interface GraceLog {
  (...args: any[]): void;
  fn: Variadic;
  log: Variadic;
  debug: Variadic;
  verbose: Variadic;
  error: Variadic;
  lvl: GraceLogLevel;
}

export const graceLog: GraceLog = Object.assign(
  (...args: any) => args.length > 0 && graceLog.log(...args),
  {
    lvl: GraceLogLevel.log,
    fn: console.log,
    log: (...args: any[]) => graceLog.lvl > 0 && graceLog.fn(...args),
    debug: (...args: any[]) => graceLog.lvl > 1 && graceLog.fn(...args),
    verbose: (...args: any[]) => graceLog.lvl > 2 && graceLog.fn(...args),
    error: (e: unknown, ...args: unknown[]) => {
      graceLog(`[ERROR]`, ...args, e);
    },
  }
);
