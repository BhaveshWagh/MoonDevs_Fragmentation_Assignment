import React from 'react'
import BurnTxTable from './BurnTxTable'

const TransactionTableStyled = ({priceUSDTxTable,data}) => {
  return (
    <div>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>
        <BurnTxTable
          data={data}
          priceUSD={priceUSDTxTable}
        />
    </div>
  )
}

export default TransactionTableStyled
