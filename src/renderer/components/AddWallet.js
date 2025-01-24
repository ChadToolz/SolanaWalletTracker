import React, { useState } from 'react';
import { useWallets } from '../context/WalletsContext/index.js';

const AddWallet = () => {
  const [wallet, setWallet] = useState('');
  const { addWallet } = useWallets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addWallet(wallet.trim());
    setWallet('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button type="submit">Add Wallet</button>
    </form>
  );
};

export default AddWallet;