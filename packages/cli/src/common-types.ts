  import { MidnightProviders } from "@midnight-ntwrk/midnight-js-types";
  
  export const QuickStarterPrivateStateId = "crowdFundingPrivateState";
  export type QuickStarterPrivateStateId = typeof QuickStarterPrivateStateId;
  export type CrowdFundingContractProviders = MidnightProviders<
    QuickStarterPrivateStateId
  >;
  