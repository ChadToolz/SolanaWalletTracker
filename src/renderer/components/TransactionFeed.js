import React, { useEffect, useState } from 'react';
import { useWallets } from '../context/WalletsContext/index.js';
import {
  addLogListener,
} from '../services/solana.js';

const TransactionFeed = () => {
  const { wallets } = useWallets();

  useEffect(() => {
    wallets.map((wallet) => {
        // return addWalletListener(wallet, () => {
        //     console.log('log:', log);
        // });
    });
  }, []);

  return (
    <div>
      <h2>Transaction Feed</h2>
      <ul>
        {/* {transactions.map((tx, idx) => (
          <li key={idx}>
            <p>
              <strong>Signature:</strong> {tx.signature}
            </p>
            <p>
              <strong>Logs:</strong> {tx.logs.join(', ')}
            </p>
            <p>
              <strong>Timestamp:</strong> {tx.timestamp}
            </p>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default TransactionFeed;