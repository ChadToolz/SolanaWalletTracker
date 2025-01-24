import React from 'react';
import { WalletProvider } from './context/WalletsContext/index.js';
import TransactionFeed from './components/TransactionFeed.js';
import AddWalletForm from './components/AddWallet.js';
import WalletList from './components/WalletList.js';
import CurrentSlot from './components/CurrentSlot.js';
import {
    initializeLogListener,
} from './services/solana.js';

initializeLogListener();

const App = () => {
  return (
    <WalletProvider>
      <div>
        <h1>Solana Wallet Tracker</h1>
        <CurrentSlot />
        <AddWalletForm />
        <WalletList />
        <TransactionFeed />
      </div>
    </WalletProvider>
  );
};

export default App;