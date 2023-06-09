import {
  BaseFilter,
  DduItem,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.0.2/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.0.2/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.0/file.ts";
import { basename, dirname } from "https://deno.land/std@0.191.0/path/mod.ts";

type Params = Record<never, never>;

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
