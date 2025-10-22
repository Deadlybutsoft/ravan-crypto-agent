import React from 'react';
import { PeraWalletIcon, MetaMaskIcon, DemoWalletIcon } from './icons';

interface WalletConnectModalProps {
  onConnect: (walletType: 'pera' | 'metamask' | 'demo') => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ onConnect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-gray-700 p-8 max-w-md w-full text-center rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-white">Connect to Ravan</h2>
        <div className="space-y-4">
          <WalletOption
            icon={<PeraWalletIcon />}
            name="Pera Wallet"
            onClick={() => onConnect('pera')}
            buttonText="Connect"
          />
          <WalletOption
            icon={<MetaMaskIcon />}
            name="MetaMask"
            onClick={() => onConnect('metamask')}
            buttonText="Connect"
          />
          <WalletOption
            icon={<DemoWalletIcon />}
            name="Demo Wallet"
            onClick={() => onConnect('demo')}
            buttonText="Try Demo"
            badge="100 ALGO testnet"
          />
        </div>
      </div>
    </div>
  );
};

interface WalletOptionProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  buttonText: string;
  badge?: string;
}

const WalletOption: React.FC<WalletOptionProps> = ({ icon, name, onClick, buttonText, badge }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center p-4 bg-[#2A2A2A] rounded-lg border border-gray-600 hover:border-purple-500 transition-all duration-300 group text-left"
    >
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div className="ml-4 flex-grow">
            <span className="text-lg font-bold text-white">{name}</span>
        </div>
        {badge && (
            <span className="hidden sm:inline-block mr-4 bg-purple-900/50 text-purple-300 text-xs font-bold px-2.5 py-1 rounded-full">{badge}</span>
        )}
        <div className="font-mono font-bold py-2 px-4 relative overflow-hidden bg-gray-600 text-white rounded-md group-hover:bg-purple-600 transition-colors">
            {buttonText}
        </div>
    </button>
);

export default WalletConnectModal;