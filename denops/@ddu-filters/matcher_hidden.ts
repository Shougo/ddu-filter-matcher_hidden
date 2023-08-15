import {
  BaseFilter,
  DduItem,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.5.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.5.0/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";
import { basename, dirname } from "https://deno.land/std@0.198.0/path/mod.ts";

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
