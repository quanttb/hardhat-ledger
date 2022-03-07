# Hardhat template using Ledger device

## Overview

- This template is used for:
  - Deploying contracts or upgradeable contracts
  - Compiling using multiple compilers
  - Testing contracts
  - Verifying contracts
  - Checking Ledger account info before deploying
- Tested on macOS 12.2.1 and Ledger Nano S

## Prerequisites

- Ethereum app must be installed on your Ledger device and Blind Signing is enabled in Settings
- The following prerequisites are required to be installed on your system:
  - NodeJS 16
  - Yarn (optional)
- And install all dependencies by running this script:

  ```sh
  yarn
  ```

- Update env.json.example file and rename it to env.json

## Execution

- Compile:

  ```sh
  yarn compile
  ```

- Test:

  ```sh
  yarn test
  ```

- Migrate (Testnet):

  ```sh
  yarn migrate:testnet
  ```

- Migrate (Mainnet):

  ```sh
  yarn migrate:mainnet
  ```

- Verify (Testnet):

  ```sh
  yarn verify:testnet
  ```

- Verify (Mainnet):

  ```sh
  yarn verify:mainnet
  ```

## Contribution

Your contribution is welcome and greatly appreciated. Please contribute your fixes and new features via a pull request. Pull requests and proposed changes will then go through a code review and once approved will be merged into the project

If you like my work, please leave me a star :)
