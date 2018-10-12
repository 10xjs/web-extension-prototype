// flow-typed signature: 16aa88dcf6d6f9acbf54dafb4f61707e
// flow-typed version: <<STUB>>/glob_v7/flow_v0.82.0

declare module "glob" {
  declare type MinimatchOptions = {|
    debug?: boolean,
    nobrace?: boolean,
    noglobstar?: boolean,
    dot?: boolean,
    noext?: boolean,
    nocase?: boolean,
    nonull?: boolean,
    matchBase?: boolean,
    nocomment?: boolean,
    nonegate?: boolean,
    flipNegate?: boolean
  |};

  declare type Options = {|
    ...MinimatchOptions,
    cwd?: string,
    root?: string,
    nomount?: boolean,
    mark?: boolean,
    nosort?: boolean,
    stat?: boolean,
    silent?: boolean,
    strict?: boolean,
    cache?: {
      [path: string]: boolean | "DIR" | "FILE" | $ReadOnlyArray<string>
    },
    statCache?: {
      [path: string]: boolean | { isDirectory(): boolean } | void
    },
    symlinks?: { [path: string]: boolean | void },
    realpathCache?: { [path: string]: string },
    sync?: boolean,
    nounique?: boolean,
    nodir?: boolean,
    ignore?: string | $ReadOnlyArray<string>,
    follow?: boolean,
    realpath?: boolean,
    absolute?: boolean
  |};

  /**
   * Called when an error occurs, or matches are found
   *   err
   *   matches: filenames found matching the pattern
   */
  declare type CallBack = (err: ?Error, matches: Array<string>) => void;

  declare class Glob extends events$EventEmitter {
    constructor(pattern: string): this;
    constructor(pattern: string, callback: CallBack): this;
    constructor(pattern: string, options: Options, callback: CallBack): this;

    minimatch: {};
    options: Options;
    aborted: boolean;
    cache: {
      [path: string]: boolean | "DIR" | "FILE" | $ReadOnlyArray<string>
    };
    statCache: {
      [path: string]: boolean | { isDirectory(): boolean } | void
    };
    symlinks: { [path: string]: boolean | void };
    realpathCache: { [path: string]: string };
    found: Array<string>;

    pause(): void;
    resume(): void;
    abort(): void;
  }

  declare class GlobModule {
    Glob: Class<Glob>;

    (pattern: string, callback: CallBack): void;
    (pattern: string, options: Options, callback: CallBack): void;

    hasMagic(pattern: string, options?: Options): boolean;
    sync(pattern: string, options?: Options): Array<string>;
  }

  declare module.exports: GlobModule;
}
