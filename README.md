# Midnight Setup - MeshJS Toolkit

<div align="center">
  <h1>@meshsdk/midnight-setup</h1>
  <p><strong>Complete development setup for building Midnight Network dApps</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/@meshsdk/midnight-setup.svg)](https://www.npmjs.com/package/@meshsdk/midnight-setup)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
</div>

---

## 🚀 What is this?

This monorepo contains the complete Midnight Setup toolkit for building decentralized applications on the Midnight Network. It includes:

- **📦 @meshsdk/midnight-setup** - Main npm package with smart contract, API, and types
- **🖥️ UI Package** - Example React application demonstrating usage
- **⚙️ CLI Package** - Command-line tools for development
- **📜 Contract Package** - Compact smart contract source

## 🎯 Copy & Paste - Build Your First dApp in 2 Minutes

### 1. Install Dependencies

```bash
npm install @meshsdk/midnight-setup \
  @midnight-ntwrk/dapp-connector-api@3.0.0 \
  @midnight-ntwrk/midnight-js-fetch-zk-config-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-http-client-proof-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-indexer-public-data-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-level-private-state-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-network-id@2.0.2 \
  react react-dom buffer process
```

### 2. Copy These Files

#### `src/polyfills.ts`
```typescript
import { Buffer } from 'buffer';

window.Buffer = Buffer;
window.global = window.global || window;
window.process = window.process || { env: {} };

export { Buffer };
```

#### `src/lib/providers.ts`
```typescript
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import type { MidnightSetupContractProviders } from '@meshsdk/midnight-setup';

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
  // Connect to Lace Wallet
  const wallet = window.midnight?.mnLace;
  if (!wallet) {
    throw new Error('Please install Lace Beta Wallet for Midnight Network');
  }

  // Enable wallet and get state
  const walletAPI = await wallet.enable();
  const walletState = await walletAPI.state();
  const uris = await wallet.serviceUriConfig();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'my-dapp-state',
    }),
    zkConfigProvider: new FetchZkConfigProvider(
      window.location.origin,
      fetch.bind(window)
    ),
    proofProvider: httpClientProofProvider(uris.proverServerUri),
    publicDataProvider: indexerPublicDataProvider(
      uris.indexerUri,
      uris.indexerWsUri
    ),
    walletProvider: {
      coinPublicKey: walletState.coinPublicKey,
      encryptionPublicKey: walletState.encryptionPublicKey,
      balanceTx: (tx, newCoins) => {
        return walletAPI.balanceAndProveTransaction(tx, newCoins);
      },
    },
    midnightProvider: {
      submitTx: (tx) => {
        return walletAPI.submitTransaction(tx);
      },
    },
  };
}

// TypeScript declaration for window.midnight
declare global {
  interface Window {
    midnight?: {
      mnLace?: any;
    };
  }
}
```

#### `src/hooks/useMidnightContract.ts`
```typescript
import { useState, useCallback } from 'react';
import { MidnightSetupAPI, type DeployedMidnightSetupAPI } from '@meshsdk/midnight-setup';
import { setupProviders } from '../lib/providers';

export function useMidnightContract() {
  const [api, setApi] = useState<DeployedMidnightSetupAPI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deployContract = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const providers = await setupProviders();
      const newApi = await MidnightSetupAPI.deployMidnightSetupContract(providers);
      setApi(newApi);
      return newApi;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to deploy';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const joinContract = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const providers = await setupProviders();
      const newApi = await MidnightSetupAPI.joinMidnightSetupContract(providers, address);
      setApi(newApi);
      return newApi;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    api,
    loading,
    error,
    deployContract,
    joinContract,
  };
}
```

#### `src/App.tsx`
```typescript
import { useState, useEffect } from 'react';
import { useMidnightContract } from './hooks/useMidnightContract';

function App() {
  const { api, loading, error, deployContract, joinContract } = useMidnightContract();
  const [message, setMessage] = useState<string>('');
  const [contractAddress, setContractAddress] = useState('');

  // Read contract state when API is ready
  useEffect(() => {
    if (api) {
      api.getLedgerState().then(state => {
        setMessage(state.ledgerState?.message || '');
      });
    }
  }, [api]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '28px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🌙 My Midnight dApp
        </h1>
        <p style={{ color: '#666', margin: '0 0 30px 0' }}>
          Built with @meshsdk/midnight-setup
        </p>

        {/* Deploy new contract */}
        {!api && (
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={deployContract} 
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {loading ? '⏳ Deploying...' : '🚀 Deploy New Contract'}
            </button>

            <div style={{ 
              margin: '20px 0', 
              padding: '20px 0',
              borderTop: '1px solid #eee',
              borderBottom: '1px solid #eee'
            }}>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                Or join existing contract:
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Contract address"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <button
                  onClick={() => joinContract(contractAddress)}
                  disabled={loading || !contractAddress}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'white',
                    background: (loading || !contractAddress) ? '#ccc' : '#667eea',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: (loading || !contractAddress) ? 'not-allowed' : 'pointer',
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show error */}
        {error && (
          <div style={{ 
            padding: '12px', 
            background: '#fee', 
            color: '#c00', 
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ❌ {error}
          </div>
        )}

        {/* Show contract info */}
        {api && (
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)', 
            borderRadius: '8px',
            border: '2px solid #48bb78'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2f855a' }}>
              ✅ Contract Connected
            </h3>
            <div style={{ fontSize: '14px', color: '#2d3748' }}>
              <p style={{ margin: '8px 0' }}>
                <strong>📍 Address:</strong><br />
                <code style={{ 
                  background: 'white', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  display: 'inline-block',
                  marginTop: '4px',
                  wordBreak: 'break-all'
                }}>
                  {api.deployedContractAddress}
                </code>
              </p>
              <p style={{ margin: '12px 0' }}>
                <strong>💬 Message:</strong><br />
                <span style={{
                  background: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginTop: '4px'
                }}>
                  {message || 'Loading...'}
                </span>
              </p>
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '30px', 
          paddingTop: '20px', 
          borderTop: '1px solid #eee',
          textAlign: 'center',
          color: '#999',
          fontSize: '12px'
        }}>
          Made with ❤️ by MeshJS Team
        </div>
      </div>
    </div>
  );
}

export default App;
```

#### `src/main.tsx`
```typescript
import './polyfills'; // ← Add this FIRST
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
});
```

### 3. Run Your dApp

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
# Install Lace Beta Wallet
# Click "Deploy New Contract"
```

**That's it! You now have a fully working Midnight Network dApp.** 🎉

See the [complete documentation](./packages/api/README.md) for more examples.

## 🏗️ Development

This is a Yarn workspace monorepo. To work on this project:

### Prerequisites

- Node.js ≥ 22
- Yarn 4.9.2+
- Midnight Network tools (compact compiler)

### Setup

```bash
# Install dependencies
yarn install

# Build all packages
yarn build:all

# Build individual packages
cd packages/contract && yarn build
cd packages/api && yarn build
cd packages/cli && yarn build
cd packages/ui && yarn build
```

### Package Structure

```
.
├── packages/
│   ├── api/          # @meshsdk/midnight-setup (publishable)
│   ├── contract/     # Smart contract compilation
│   ├── cli/          # CLI tools (internal)
│   └── ui/           # Example React app (internal)
└── compact/          # Compact compiler workspace
```

### Scripts

```bash
# Build all packages
yarn build:all

# Clean build artifacts
yarn clean

# Clean cache
yarn clean:cache
```

## 📚 Packages

### @meshsdk/midnight-setup

The main package that users install. Contains:
- Compiled smart contract
- TypeScript API for contract interaction
- Complete type definitions
- Wallet integration utilities

**Location**: `packages/api`  
**Status**: ✅ Publishable to npm

### Example UI

React application demonstrating how to use the library.

**Location**: `packages/ui`  
**Status**: 🔒 Private (development only)

**Features**:
- Wallet connection
- Contract deployment
- Contract joining
- State reading
- Beautiful UI with Tailwind CSS

**Run locally**:
```bash
cd packages/ui
yarn dev
```

### CLI Tools

Command-line interface for contract operations.

**Location**: `packages/cli`  
**Status**: 🔒 Private (development only)

### Contract

Compact smart contract source and compilation.

**Location**: `packages/contract`  
**Status**: 🔒 Private (compilation only)

## 🎯 Features

- ✅ **Type-Safe**: Full TypeScript support with strict typing
- ✅ **Easy to Use**: Simple API for deploying and joining contracts
- ✅ **Well Documented**: Comprehensive README and examples
- ✅ **Production Ready**: Built with best practices
- ✅ **Extensible**: Easy to customize for your needs
- ✅ **Modern Stack**: React 19, Vite, TypeScript 5.8

## 🔧 Technologies

- **Midnight Network**: Blockchain platform
- **Compact**: Smart contract language
- **TypeScript**: Type-safe development
- **React**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **RxJS**: Reactive programming
- **Pino**: Logging

## 📖 Documentation

- [Library Documentation](./packages/api/README.md) - How to use @meshsdk/midnight-setup
- [Publishing Guide](./PUBLISHING.md) - How to publish to npm
- [Midnight Network Docs](https://docs.midnight.network) - Official Midnight documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [MeshJS Team](https://github.com/MeshJS)

See [LICENSE](./LICENSE) for more information.

## 🔗 Links

- [MeshJS Website](https://meshjs.dev)
- [MeshJS GitHub](https://github.com/MeshJS)
- [Midnight Network](https://midnight.network)
- [npm Package](https://www.npmjs.com/package/@meshsdk/midnight-setup)

## 💬 Support

- 🐛 [Report Issues](https://github.com/MeshJS/midnight-setup/issues)
- 💬 [Discord Community](https://discord.gg/meshjs)
- 🐦 [Twitter](https://twitter.com/meshsdk)

---

<div align="center">
  <p>Built with ❤️ by the MeshJS Team</p>
  <p>Powered by Midnight Network</p>
</div>

