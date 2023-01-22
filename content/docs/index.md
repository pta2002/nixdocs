---
title: NixVim documentation
---

## Instalation
### Using flakes

```nix
{
  inputs.nixvim.url = "github:pta2002/nixvim";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    nixvim,
    flake-utils,
  }: let
    config = {
      colorschemes.gruvbox.enable = true;
    };
  in
    flake-utils.lib.eachDefaultSystem (system: let
      nixvim' = nixvim.legacyPackages."${system}";
      nvim = nixvim'.makeNixvim config;
    in {
      packages = {
        inherit nvim;
        default = nvim;
      };
    });
}
```