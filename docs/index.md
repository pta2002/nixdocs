---
title: Home
---

NVDocs is a documentation generator for Nix modules.

It makes use of the already available description of Nix modules in order to generate an indexable, and searchable static site for your documentation.

In addition, it also supports custom documentation pages (like the one you're reading right now!) that can, optionally, reference options.

This is all meant to provide the best possible documentation for your project.

# Getting started

The best way to set up NVDocs is using Nix Flakes.

```nix
{
  inputs.nvdocs.url = "github:pta2002/nvdocs";

  # In the real world, you'll probably want to use flake-utils
  outputs = { self, nixpkgs, nvdocs, ... }: let
    pkgs = import nixpkgs { system = "x86_64-linux"; };
    options = pkgs.lib.evalModules {
      modules = [ /* your modules here */ ];
    };
  in {
    packages.x86_64-linux.docs = nvdocs.lib.mkDocs {
      inherit pkgs options;
      title = "My Nix Project";
      description = "Short description to show below the title";
      docs = ./docs;
    };
  };
}
```

Then, build using `nix build .#docs`. The result is a directory containing all the files to deploy to your static site.
