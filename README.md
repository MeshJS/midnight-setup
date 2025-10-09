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


## Try the Project

To test the complete setup locally:

```bash
# 1. Install dependencies
yarn install

# 2. Build all packages
yarn build:all

# 3. Download fetch parameters
cd packages/cli && ./fetch-zk-params.sh

# 4. Start testnet with Docker
docker-compose -f testnet.yml up -d

# 5. Run the frontend
cd ../ui && yarn start
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