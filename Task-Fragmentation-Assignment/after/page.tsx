import DashboardLayoutStyled from "./components/DashBoardLayoutStyle/DashboardLayoutStyled";
import TransactionTableStyled from "./components/TransactionTableStyled/TransactionTableStyled";
import useBurnPage from "./hooks/useBurnPage";
import useSubscribe from "./hooks/useSubscribe";

const BurnPageStyled = styled.div``;

enum BurnTxProgress {
  default = "Burn App Tokens",
  burning = "Burning...",
}

export const BurnPage = () => {
  //   custom hook
  const {} = useBurnPage();
  const {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
  } = useWallet();

  //   custom hook
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();

  //   custom hook
  const { chains: receiveChains } = useWallet();

  //   custom hook
  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    walletChain,
    fetchSupplies,
  } = useAppSupplies(true);

  const { toastMsg, toastSev, showToast } = useAppToast();

  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });

  const [approveTxHash, setApproveTxHash] = useState<string | null>(null);


  const [coinData, setCoinData] = useState<any>({});

  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        //console.log("coin stats", data);
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refetchTransactions = () => {
    Promise.all(
      ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
    )
      .then((results: any) => {
        //console.log(res);
        let res = results.flat();
        res = ChainScanner.sortOnlyBurnTransactions(res);
        res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
        setBurnTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useSubscribe();
 
  return (
    <div>
      <DashboardLayoutStyled walletChain={walletChain} />

      <TransactionTableStyled
        data={burnTransactions}
        priceUSDTxTable={coinData?.current_price?.usd}
      />

      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
};
