import type { MidnightSetupContractProviders, DeployedMidnightSetupAPI } from "@midnight-setup/midnight-setup-api";
import type { DAppConnectorWalletAPI, ServiceUriConfig } from "@midnight-ntwrk/dapp-connector-api";


export interface WalletAndProvider{
    readonly wallet: DAppConnectorWalletAPI,
    readonly uris: ServiceUriConfig,
    readonly providers: MidnightSetupContractProviders
}

export interface WalletAPI {
  wallet: DAppConnectorWalletAPI;
  coinPublicKey: string;
  encryptionPublicKey: string;
  uris: ServiceUriConfig;
}


export interface MidnightSetupDeployment{
  status: "inprogress" | "deployed" | "failed",
  api: DeployedMidnightSetupAPI;
}