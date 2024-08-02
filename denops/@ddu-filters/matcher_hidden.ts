import {
  BaseFilter,
  type DduItem,
  type SourceOptions,
} from "jsr:@shougo/ddu-vim@^5.0.0/types";

import { type ActionData } from "jsr:@shougo/ddu-kind-file@^0.8.0";

import type { Denops } from "jsr:@denops/core@^7.0.0";

import { basename, dirname } from "jsr:@std/path@1.0.2";

type Params = Record<string, never>;

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {
    return Promise.resolve(args.items.filter(
      (item) => {
        const action = item.action as ActionData;
        if (!action.path) return false;
        return args.input.includes(".") ||
          (!basename(action.path).startsWith(".") &&
            !basename(dirname(action.path)).startsWith(".") &&
            !item.matcherKey.startsWith("."));
      },
    ));
  }

  override params(): Params {
    return {};
  }
}
