{
  description = "Nix module documentation generator";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nix-filter.url = "github:numtide/nix-filter";

  outputs = { self, nixpkgs, flake-utils, nix-filter, ... }: flake-utils.lib.eachDefaultSystem
    (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages.default = self.lib.mkDocs {
          pkgs = pkgs;
          title = "NixvDocs";
          description = "Simple Nix documentation";
          options = pkgs.lib.evalModules {
            modules = [{
              options.test.option = pkgs.lib.mkEnableOption "test option";
            }];
          };
        };
      }) // {
    lib.mkDocs =
      { pkgs
      , title
      , description
      , options
      , warningsAreErrors ? true
      }:
      let
        docs = (pkgs.nixosOptionsDoc {
          # If we don't do this, we end up with _module.args on the generated options, which we do not want
          options = pkgs.lib.filterAttrs (k: _: k != "_module") options.options;
          warningsAreErrors = warningsAreErrors;
        }).optionsNix;
        transformedDocs = pkgs.lib.mapAttrsToList (k: v: { name = k; } // v) docs;
        docsFile = pkgs.writeText "options.json" (builtins.toJSON transformedDocs);
        src = ./.;

        frontend = pkgs.mkYarnPackage {
          src = ./.;
          buildPhase = ''
            export HOME=$TMP
            yarn --offline build
            mv deps/nvdocs/dist .
          '';

          installPhase = ''
            mv dist $out
          '';

          doDist = false;
        };
      in
      frontend;
  };
}
