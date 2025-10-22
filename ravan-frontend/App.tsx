
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import ConnectPage from './components/ConnectPage';
import ChatPage from './components/ChatPage';
import { Page, Wallet } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const navigateToConnect = () => {
    setCurrentPage('connect');
  };
  
  const handleConnect = (selectedWallet: Wallet) => {
    setWallet(selectedWallet);
    setCurrentPage('chat');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onLaunch={navigateToConnect} />;
      case 'connect':
        return <ConnectPage onConnect={handleConnect} />;
      case 'chat':
        return <ChatPage wallet={wallet} />;
      default:
        return <MainPage onLaunch={navigateToConnect} />;
    }
  };

  return (
    <div className="bg-[#212121] text-white min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;