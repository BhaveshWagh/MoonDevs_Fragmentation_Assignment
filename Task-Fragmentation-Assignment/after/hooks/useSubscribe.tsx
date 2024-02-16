import React,{useState} from "react";
import useBurnPage from "./useBurnPage";
import useWallet from "./useWallet";


const useSubscribe = () => {
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const [isOldToken, setIsOldToken] = useState(false);
  const tokenAddress = fetchAddressForChain(
    suppliesChain?.id,
    isOldToken ? "oldToken" : "newToken"
  );


  useBurnPage()
  useEffect(() => {
    if (!walletChain) return;
    //console.log(suppliesChain);
    let isSubscribed = true;
    // const newTokenAddress = fetchAddressForChain(
    //   walletChain?.id,
    //   isOldToken ? "oldToken" : "newToken"
    // );
    if (isSubscribed) setBurnTransactions([]);
    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects: any[] = [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
    Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
      .then((results: any) => {
        //console.log(results, isTestnet);
        if (isSubscribed) {
          let new_chain_results: any[] = [];
          results.forEach((results_a: any[], index: number) => {
            new_chain_results.push(
              results_a.map((tx: any) => ({
                ...tx,
                chain: _chainObjects[index],
              }))
            );
          });
          let res = new_chain_results.flat();
          console.log(res, isTestnet);
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);

  return burnTransactions;
};

export default useSubscribe;
