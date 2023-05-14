import { useCallback, useState } from "react";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";

export const ChainId = {
  GOERLI: 5,
  AVALANCHE_FUJI: 43113,
};

const useSmartAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { chain } = useNetwork();

  const createSmartAccount = useCallback(async () => {
    if (!address) return;

    try {
      const provider = new ethers.providers.Web3Provider(publicClient as ethers.providers.ExternalProvider);

      const wallet = new SmartAccount(provider, {
        activeNetworkId: chain?.id,
        supportedNetworksIds: [ChainId.GOERLI, ChainId.AVALANCHE_FUJI],
        networkConfig: [
          {
            chainId: ChainId.GOERLI,
            dappAPIKey: "WEX9LXdFW.13107308-4631-4ba5-9e23-2a8bf8270948",
          },
          {
            chainId: ChainId.AVALANCHE_FUJI,
            dappAPIKey: "WEX9LXdFW.13107308-4631-4ba5-9e23-2a8bf8270948",
          },
        ],
      });

      await wallet.init();
    } catch (error) {
      console.error(error);
    }
  }, [address, chain?.id, publicClient]);

  return {
    createSmartAccount,
  };
};

export default useSmartAccount;
