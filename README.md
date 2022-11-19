# ddu-filter-matcher_hidden

Hide hidden files matcher for ddu.vim

This matcher filters hidden files.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_hidden'],
    \     },
    \   }
    \ })
```
