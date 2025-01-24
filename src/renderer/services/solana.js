import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

let logListenerId = null;

const listening = true;
const logListeners = [];

export const removeLogListener = (callback) => {
    logListeners.filter((listener) => listener !== callback);
};

export const addLogListener = (callback) => {
    logListeners.push(callback);
    
    return () => {
        removeLogListener(callback);
    };
};

export const initializeLogListener = (callback) => {
  if (logListenerId !== null) return;
  console.log('📡 initializing log listener');

  logListenerId = connection.onLogs(
    'all',
    ({err, ...logInfo}, context) => {
        if (err || !listening) return;
        
        logListeners.forEach((listener) => listener([logInfo, context]));
    },
    'processed'
  );
};

export const cleanupLogListener = () => {
  if (logListenerId !== null) {
    connection.removeOnLogsListener(logListenerId);
    logListenerId = null;
  }
};

export const addWalletListener = (wallet, callback) => {
  const subscriptionId = connection.onAccountChange(new PublicKey(wallet), callback, { commitment: 'processed', encoding: 'jsonParsed' });
  console.log('💳 wallet change listener created', wallet, subscriptionId);
  
  return () => {
    console.log('💳 wallet change listener removed', wallet, subscriptionId);
    connection.removeAccountChangeListener(subscriptionId);
  };
};

export const getWalletBalance = async (wallet) => {
  const lamports = await connection.getBalance(new PublicKey(wallet), 'processed');
  
  if (!lamports) {
    console.error(`💳 wallet ${wallet} info not found`);
    return 0;
  }
  
  const balance = lamports / LAMPORTS_PER_SOL;
  
  return balance;
};