# Uniswap SDK's

A repository for many Uniswap SDK's. All SDK's can be found in `sdk/` and have more information in their individual README's.
This is a fork of [sdks](https://github.com/Uniswap/sdks) that includes the configuration for Glue Devnet, Testnet, Mainnet. Eventually this could be PRed back into the main Uniswap repository to have official support for Glue Network

## Using these SDKs in other apps

1. Make the required changes to the SDKs
2. Build all the SDKs using `yarn g:build`
3. Run the `node_modules` migration using `yarn migrate <path-to-node-modules>`
   1. In the case of an app setup with `glue-uniswap-sdks` and `glue-monorepo` in the same folder, this would be:

      ```bash
      yarn migrate ../glue-monorepo/apps/client/node_modules
      ```
4. Go into the destination app and run `npx patch-package` to generate the new patch files

   1. e.g in the `glue-monorepo`, run the following command from `apps/client` for each package that you have changed

   ```bash
   npx patch-package @uniswap/sdk-core
   ```

## Development Commands

```markdown
# Clone

git clone --recurse-submodules https://github.com/Uniswap/sdks.git

# Install

yarn

# Build

yarn g:build

# Typecheck

yarn g:typecheck

# Lint

yarn g:lint

# Test

yarn g:test

# Run a specific package.json command for an individual SDK

yarn sdk @uniswap/{sdk-name} {command}
```

## Publishing SDK's

Publishing of each SDK is done on merge to main using semantic-release and semantic-release-monorepo. PR titles / commits follow angular conventional commits with custom settings that map as follows:

```markdown
- `fix(SDK name):` will trigger a patch version
- `<type>(public):` will trigger a patch version
- `feat(SDK name):` will trigger a minor version
- `feat(breaking):` will trigger a major version for a breaking change
```

Versions will only be generated based on the changelog of the relevant SDK's folder/files.
