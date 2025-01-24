import React, { useCallback, useEffect, useState } from 'react';
import { useWallets } from '../context/WalletsContext/index.js';
import { addWalletListener, getWalletBalance } from '../services/solana.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Wallet = ({ wallet }) => {
  const [balance, setBalance] = useState(0);
  
  const walletListenerCallback = useCallback((accountInfo, { slot }) => {
    const balance = accountInfo.lamports / LAMPORTS_PER_SOL;
    setBalance(accountInfo.lamports / LAMPORTS_PER_SOL)
    
    console.log(`💳 wallet ${wallet} updated`);
    console.log(`💰 balance: ${balance}`);
    console.log(`🧱 block: ${slot}`);
  }, [wallet])
  
  useEffect(() => {
    getWalletBalance(wallet).then((balance) => {
      setBalance(balance);
      
      console.log(`💳 wallet ${wallet} loaded`);
      console.log(`💰 balance: ${balance}`);
    });
    
    return addWalletListener(wallet, walletListenerCallback);
  }, [wallet, walletListenerCallback]);
  
  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '10px' }}>{wallet}</span>
      <span style={{ marginRight: '10px' }}>{balance}</span>
      <button
        style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
      >
        Remove
      </button>
    </li>
  )
};
const WalletList = () => {
  const { wallets, removeWallet } = useWallets();

  return (
    <div>
      <h2>Tracked Wallets</h2>
      {wallets.length === 0 ? (
        <p>No wallets being tracked. Add a wallet to get started!</p>
      ) : (
        <ul>
          {wallets.map((wallet, index) => (
            <Wallet key={index} wallet={wallet} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletList;
