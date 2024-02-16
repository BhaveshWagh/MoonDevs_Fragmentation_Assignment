import React from "react";
import BurnButtonBar from "./BurnButtonBar";
import BurnStatsContainer from "./BurnStatsContainer";
// import useWallet fr
const DashboardLayoutStyled = () => {
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
  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    walletChain,
    fetchSupplies,
  } = useAppSupplies(true);


  return (
    <div className="burnpage">
      <div
        className="top_conatiner burnpage"
        style={{ alignItems: "flex-start" }}
      >
        <div className="info_box filled">
          <h1 className="title">App TOKEN BURN</h1>
          <p className="description medium"></p>

          <BurnButtonBar walletChainBurnbtn={walletChain} />
        </div>
        <BurnStatsContainer
          supplies={supplies}
          suppliesChain={suppliesChain}
          walletChainBurnstats={walletChain}
          allSupplies={allSupplies}
          numberWithCommas={numberWithCommas}
        />
      </div>
    </div>
  );
};

export default DashboardLayoutStyled;
