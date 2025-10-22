
import React from 'react';
import { Wallet } from '../types';
import { PeraWalletIcon, MetaMaskIcon, DemoWalletIcon } from './icons';

interface ConnectPageProps {
  onConnect: (wallet: Wallet) => void;
}

interface WalletOptionProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  buttonText: string;
  badge?: string;
  disabled?: boolean;
}

const WalletOption: React.FC<WalletOptionProps> = ({ icon, name, onClick, buttonText, badge, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center p-4 bg-white border-2 border-black hover:border-purple-500 transition-all duration-300 group text-left disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div className="ml-4 flex-grow">
            <span className="text-lg font-bold text-black font-saira">{name}</span>
        </div>
        {badge && (
            <span className="hidden sm:inline-block mr-4 bg-purple-200 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full">{badge}</span>
        )}
        <div className="font-mono font-bold py-2 px-4 relative overflow-hidden bg-black text-white group-hover:bg-purple-600 transition-colors">
            {buttonText}
        </div>
    </button>
);


const ConnectPage: React.FC<ConnectPageProps> = ({ onConnect }) => {
    const handleDemoConnect = () => {
        onConnect({
            address: 'RAVANDEMOWALLETFORTHEWINXYZ123ABCDE',
            balance: 100.0,
        });
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center px-4 bg-white text-black">
            <div className="text-center max-w-lg w-full">
                <h1 className="font-pixel text-[4rem] sm:text-[6rem] font-normal text-black leading-none mb-16">
                    <span className="select-none">Ra</span><span className="text-purple-500">van</span>
                </h1>
                <div className="space-y-4">
                    <WalletOption
                        icon={<PeraWalletIcon />}
                        name="Pera Wallet"
                        onClick={() => {}}
                        buttonText="Connect"
                        disabled={true}
                    />
                    <WalletOption
                        icon={<MetaMaskIcon />}
                        name="MetaMask"
                        onClick={() => {}}
                        buttonText="Connect"
                        disabled={true}
                    />
                    <WalletOption
                        icon={<DemoWalletIcon />}
                        name="Demo Wallet"
                        onClick={handleDemoConnect}
                        buttonText="Try Demo"
                        badge="100 ALGO testnet"
                    />
                </div>
                 <p className="text-gray-500 mt-12 font-mono text-sm">Pera and MetaMask support coming soon.</p>
            </div>
        </div>
    );
};

export default ConnectPage;