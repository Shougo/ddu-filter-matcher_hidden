import {
  type DduItem,
  type SourceOptions,
} from "jsr:@shougo/ddu-vim@~6.1.0/types";
import { BaseFilter } from "jsr:@shougo/ddu-vim@~6.1.0/filter";

import { type ActionData } from "jsr:@shougo/ddu-kind-file@~0.9.0";

import type { Denops } from "jsr:@denops/core@~7.0.0";

import { basename } from "jsr:@std/path@~1.0.3/basename";
import { dirname } from "jsr:@std/path@~1.0.3/dirname";

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
