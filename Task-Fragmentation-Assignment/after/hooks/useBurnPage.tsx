// useBurnPage.js
import { useState, useEffect } from "react";
import {
  useWallet,
  useChainSelector,
  useAppSupplies,
  useEthersSigner,
  useAppToast,
  ChainScanner,
  CoinGeckoApi,
} from "your-import-paths";

const useBurnPage = () => {
  
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();
  const { chains: receiveChains } = useWallet();
  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
  } = useAppSupplies(true);
  const [burnTransactions, setBurnTransactions] = useState([]);
  const [isOldToken, setIsOldToken] = useState(false);
  const { toastMsg, toastSev, showToast } = useAppToast();
  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });
  const [approveTxHash, setApproveTxHash] = useState(null);

  // ... (continue with the rest of the logic)

  return {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
    openChainSelector,
    setOpenChainSelector,
    openChainSelectorModal,
    receiveChains,
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
    burnTransactions,
    isOldToken,
    setIsOldToken,

    toastMsg,
    toastSev,
    showToast,
    ethersSigner,

    approveTxHash,
    setApproveTxHash,

    // ... (continue with the rest of the state and functions)
  };
};

export default useBurnPage;
