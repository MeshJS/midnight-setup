<div align="center">
  <h1>@meshsdk/midnight-setup</h1>
  <p><strong>Complete development setup for building Midnight Network dApps</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/@meshsdk/midnight-setup.svg)](https://www.npmjs.com/package/@meshsdk/midnight-setup)
  [![License: MIT](https://img.shields.io/badge/License-Apache2.0-yellow.svg)](https://opensource.org/licenses/Apache2.0)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
</div>

## Quick Start

### Installation

```bash
yarn add @meshsdk/midnight-setup
```

### Basic Usage

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

// Deploy a new contract
const api = await MidnightSetupAPI.deployContract(providers, contractInstance);

// Join an existing contract
const api = await MidnightSetupAPI.joinContract(providers, contractInstance, contractAddress);

// Get contract state
const state = await api.getContractState();

// Get ledger state
const ledgerState = await api.getLedgerState();
```

## What's Included

This monorepo contains everything you need to build Midnight Network dApps:

- **@meshsdk/midnight-setup** - Main npm package with API and types
- **packages/ui** - Example React application
- **packages/cli** - Command-line tools
- **packages/api** - Core API implementation

## Core API Methods

### `MidnightSetupAPI`

| Method | Description | Usage |
|--------|-------------|-------|
| `deployContract(providers, contractInstance)` | Deploy a new contract | Creates new contract instance |
| `joinContract(providers, contractInstance, address)` | Join existing contract | Connect to deployed contract |
| `getContractState()` | Read contract state | Get current contract data |
| `getLedgerState()` | Read ledger state | Get blockchain data |

### Provider Setup

```typescript
import { setupProviders } from './lib/providers';

const providers = await setupProviders();
// Returns: MidnightSetupContractProviders
```

## Lace Wallet Integration

This project includes a complete Lace Beta Wallet integration for Midnight Network:

### Wallet Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Connect Wallet** | Connect to Lace Beta Wallet | `wallet.enable()` |
| **Disconnect Wallet** | Disconnect from wallet | `wallet.disconnect()` |
| **Get Wallet State** | Retrieve wallet address and keys | `wallet.state()` |
| **Deploy Contract** | Deploy contracts through wallet | `wallet.submitTransaction()` |
| **Join Contract** | Join existing contracts | `wallet.balanceAndProveTransaction()` |
| **Balance Transactions** | Balance and prove transactions | Wallet API integration |

### Wallet Provider Setup

```typescript
// Connect to Lace Wallet
const wallet = window.midnight?.mnLace;
if (!wallet) {
  throw new Error('Please install Lace Beta Wallet for Midnight Network');
}

// Enable wallet and get state
const walletAPI = await wallet.enable();
const walletState = await walletAPI.state();
const uris = await wallet.serviceUriConfig();
```

### React Wallet Hook

```typescript
import { useMidnightWallet } from './hooks/useMidnightWallet';

function App() {
  const { 
    connectWallet, 
    disconnectWallet, 
    walletState, 
    isConnected 
  } = useMidnightWallet();
  
  return (
    <div>
      {isConnected ? (
        <button onClick={disconnectWallet}>Disconnect</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
```

## Project Structure

```
├── packages/
│   ├── api/          # Core API implementation
│   ├── ui/           # React example app
│   └── cli/          # Command-line tools
├── compact/          # Smart contract source
└── README.md
```

## Key Features

- **Zero-knowledge privacy** - Built for Midnight Network
- **TypeScript support** - Full type safety
- **React hooks** - Easy integration
- **Wallet integration** - Lace Beta Wallet support
- **CLI tools** - Development utilities

## Integration Examples

### React Hook

```typescript
import { useMidnightContract } from './hooks/useMidnightContract';

function App() {
  const { api, deployContract, joinContract } = useMidnightContract();
  
  const handleDeploy = async () => {
    const newApi = await deployContract();
    console.log('Deployed:', newApi.deployedContractAddress);
  };
  
  return <button onClick={handleDeploy}>Deploy Contract</button>;
}
```

## Testing

Automated tests are not yet available. CI currently validates builds only.
Planned test coverage is tracked in `ROADMAP.md`.

## Try the Project

To test the complete setup locally, follow these steps strictly:

- 1. Clone the repository

- using https:
```bash
git clone https://github.com/MeshJS/midnight-setup.git
```

- using ssh:
```bash
git clone git@github.com:MeshJS/midnight-setup.git
```

- 2. Navigate to the folder
```bash
cd midnight-setup
```

- 3. Install dependencies
```bash
yarn install
```

- 3. Set environment variable

- TestNet:
```bash
cd packages/ui && echo 'VITE_NETWORK_ID="TestNet"' > .env
```

- Undeployed
```bash
cd packages/ui && echo 'VITE_NETWORK_ID="Undeployed"' > .env
```

- 5. Build all packages
```bash
cd ../../ && yarn build:all
```

- 6. Download fetch parameters
```bash
cd packages/cli && ./fetch-zk-params.sh
```

- 7. Start testnet with Docker
```bash
docker-compose -f testnet.yml up -d
```

- 8. Run the frontend
```bash
cd ../ui && yarn start
```

### Configure Wallet

- Open **Midnight Lace Wallet**
- Go to **Settings** → **Network**
- Select:
  - **TestNet** for Option A
  - **Undeployed** for Option B (Standalone infrastructure)

**Recommendation:** for full testing, use **Standalone (local)** and set the wallet to **Undeployed** with the local node in the Lace Wallet.

#### Lace Wallet (Other versions)

If you hit issues with Preview, install the legacy Lace Wallet extension:

1. Sign in to download:
   - [Lace Wallet versions](https://chrome-stats.com/d/hgeekaiplokcnmakghbdfbgnlfheichg/download)

2. Download `.crx` file with version **2.34.0** that can be found [here](/lace-versions/2.34.0/hgeekaiplokcnmakghbdfbgnlfheichg.crx). 
3. In Chrome, open `chrome://extensions`.
4. Enable **Developer mode** (top-right).
5. Click **Load unpacked** and select the extracted extension folder.

After installing, set the Lace Wallet to **Undeployed** and set the Proof Server to **Local**.

- Now, you can deposit test tokens to your wallet:

- Open a new terminal and go to `cli` folder:
```bash
cd packages/cli
```

- Then run:

```sh
yarn deposit mn_shield-addr_undeployed...
```

## Resources

- [Midnight Network Docs](https://docs.midnight.network/)
- [Mesh SDK Documentation](https://meshjs.dev/)
- [Lace Beta Wallet](https://www.lace.io/)

## Community

- [Discord Community](https://discord.gg/meshjs)
- [Twitter](https://twitter.com/meshsdk)

---

<div align="center">
  <p><img src="packages/ui/public/mesh-logo.svg" alt="MeshJS Logo" width="30" height="20" style="vertical-align: middle; margin-right: 8px;" /> Powered by <a href="https://meshjs.dev/">MeshJS Team</a></p>
  <p>Built with ❤️ on Midnight Network</p>
</div>
