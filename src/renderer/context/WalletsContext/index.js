import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();
export const useWallets = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([
    "Cm9CQ1YBkCAJZEr8HYSh7kTgvm7uvwafrd1UJZSfmtrj",
  ]);

  const addWallet = (wallet) => {
    setWallets([...wallets, wallet]);
  };

  const removeWallet = (wallet) => {
    setWallets((wallets) => wallets.filter((w) => w !== wallet));
  };

  return (
    <WalletContext.Provider value={{ wallets, addWallet, removeWallet }}>
      {children}
    </WalletContext.Provider>
  );
};