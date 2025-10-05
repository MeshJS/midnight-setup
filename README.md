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

## 📦 Installation

Install the main package:

```bash
npm install @meshsdk/midnight-setup
```

Or with yarn:

```bash
yarn add @meshsdk/midnight-setup
```

See the [complete documentation](./packages/api/README.md) for usage examples.

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

