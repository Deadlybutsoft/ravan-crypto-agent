
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Wallet } from '../types';
import { getRavanResponse } from '../services/geminiService';
import { SendIcon, CloseIcon, PlusIcon, UserIcon, RavanIcon, MicrophoneIcon, NewChatIcon, PanelRightOpenIcon, ArrowUpRightIcon, ArrowDownLeftIcon, SettingsCubeIcon } from './icons';

// Merged Account and Settings Modal Component
const AccountAndSettingsModal: React.FC<{ wallet: Wallet | null, onClose: () => void, onMnemonicSet: (mnemonic: string) => void, userMnemonic: string | null }> = ({ wallet, onClose, onMnemonicSet, userMnemonic }) => {
    const [mnemonic, setMnemonic] = useState('');

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!wallet) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-lg w-full max-w-md text-black relative shadow-2xl border border-gray-200" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    {/* Account Details */}
                    <h2 className="text-2xl font-bold font-saira mb-6 text-black">Account Details</h2>
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500 font-saira">Current Balance</p>
                            <p className="text-4xl font-bold text-black font-mono">{wallet?.balance.toFixed(2)} ALGO</p>
                        </div>
                        <div>
                             <p className="text-sm text-gray-500 font-saira mb-2">Active Wallet</p>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                {userMnemonic ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs text-green-600 font-saira">User Wallet (Active)</p>
                                            <p className="text-sm text-black font-mono break-words" title={wallet?.address}>
                                                {wallet?.address}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-xs text-gray-500 font-saira">Demo Wallet (Active)</p>
                                        <p className="text-sm text-black font-mono break-words" title={wallet?.address}>
                                            {wallet?.address}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Settings */}
                    <h2 className="text-2xl font-bold font-saira mb-6 text-black">Wallet Settings</h2>
                    <div className="space-y-6">
                        {/* Current Wallet Status */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-900">Current Transaction Wallet</h3>
                                    <p className="text-sm text-blue-700">
                                        {userMnemonic ? 'Using imported mnemonic' : 'Using demo wallet'}
                                    </p>
                                </div>
                                {userMnemonic && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                        User Wallet
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Import Wallet Section */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-black mb-2">Import User Wallet</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Import your 25-word recovery phrase to send transactions from your real wallet.
                                    Your demo wallet provides 100 ALGO for testing.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Mnemonic Phrase
                                    <span className="text-xs text-gray-500 ml-2">
                                        ({mnemonic.split(' ').filter(word => word.trim()).length}/25 words)
                                    </span>
                                </label>
                                <textarea
                                    value={mnemonic}
                                    onChange={(e) => {
                                        const words = e.target.value.split(' ').filter(word => word.trim());
                                        if (words.length <= 25) {
                                            setMnemonic(e.target.value);
                                        }
                                    }}
                                    placeholder="Enter your 25-word recovery phrase, separated by spaces..."
                                    className={`w-full p-3 border rounded-lg resize-none ${
                                        mnemonic.split(' ').filter(word => word.trim()).length === 25
                                            ? 'border-green-300 bg-green-50 focus:border-green-500'
                                            : 'border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent'
                                    }`}
                                    rows={4}
                                />
                                {mnemonic.split(' ').filter(word => word.trim()).length === 25 ? (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <span>✓</span>
                                        <span>All 25 words entered. Ready to import!</span>
                                    </div>
                                ) : mnemonic.split(' ').filter(word => word.trim()).length > 0 ? (
                                    <div className="text-sm text-amber-600">
                                        Enter {25 - mnemonic.split(' ').filter(word => word.trim()).length} more word(s)
                                    </div>
                                ) : null}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        const words = mnemonic.split(' ').filter(word => word.trim());
                                        if (words.length !== 25) {
                                            alert('Please enter exactly 25 words for a valid mnemonic phrase.');
                                            return;
                                        }
                                        if (confirm('Import this wallet for transaction signing?\n\nThis will use your imported wallet for sending ALGO instead of the demo wallet.')) {
                                            onMnemonicSet(mnemonic.trim());
                                            setMnemonic('');
                                        }
                                    }}
                                    disabled={mnemonic.split(' ').filter(word => word.trim()).length !== 25}
                                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                                        mnemonic.split(' ').filter(word => word.trim()).length === 25
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Import Wallet
                                </button>
                                {userMnemonic && (
                                    <button
                                        onClick={() => {
                                            if (confirm('Switch back to demo wallet? This will use the demo account for transactions.')) {
                                                onMnemonicSet('');
                                            }
                                        }}
                                        className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-semibold transition-colors"
                                    >
                                        Use Demo
                                    </button>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
                <button className="w-full text-center p-4 font-saira font-bold text-lg text-red-500 hover:bg-red-500/10 transition-all duration-200 border-t border-gray-200 rounded-b-lg">
                    Disconnect
                </button>
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
                    aria-label="Close account menu"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

// Message Component
const Message: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';

    if (message.isTyping) {
        return (
            <div className="flex items-start gap-4 justify-start">
                <div className="bg-gray-200 rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-1.5">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (isSystem) {
        return (
            <div className="flex justify-center">
                <div className="text-center text-xs text-gray-500 font-mono py-2 px-4">
                    <p>{message.text}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-3 rounded-lg w-full whitespace-pre-wrap font-mono ${isUser ? 'bg-purple-200 text-black' : 'bg-gray-200 text-black'}`}>
                <p>{message.text}</p>
            </div>
        </div>
    );
};

const mockTransactions = [];

interface ChatPageProps {
    wallet: Wallet | null;
}

const ChatPage: React.FC<ChatPageProps> = ({ wallet: initialWallet }) => {
    const [wallet, setWallet] = useState<Wallet | null>(initialWallet);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [userMnemonic, setUserMnemonic] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (wallet && messages.length === 0) {
            setMessages([
              { id: 1, sender: 'agent', text: "Ravan is ready. How can I help you?\n\nTry these example commands:\n• Check balances: \"get the total balance of this address GQCGVTCORNYT7TH5AES7FEV7O2YUGC6LYWD4L6LDCXXMGJJHXCUQYAGUVE\"\n• View history: \"last 10 transaction history of this address HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA\"\n• Send ALGO: \"send 22 ALGO to your-friend-address\""}
            ]);
        }
    }, [wallet, messages.length]);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const scrollHeight = textarea.scrollHeight;
            const maxHeight = 160; // Corresponds to max-h-40
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [input]);


    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAttachedFile(file);
        }
    };

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() && !attachedFile) return;

        const newUserMessage: ChatMessage = { id: Date.now(), sender: 'user', text: messageText };
        const typingIndicator: ChatMessage = { id: Date.now() + 1, sender: 'agent', text: '', isTyping: true };
        
        setMessages(prev => [...prev, newUserMessage, typingIndicator]);
        setInput('');
        setAttachedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        const response = await getRavanResponse(messageText, wallet, userMnemonic);
        
        const newAgentMessage: ChatMessage = { id: Date.now() + 2, sender: 'agent', text: response.message };
        
        setMessages(prev => [...prev.filter(m => !m.isTyping), newAgentMessage]);
        
        if (response.newBalance !== undefined) {
          setWallet(prev => prev ? { ...prev, balance: response.newBalance as number } : null);
        }
    };

    if (!wallet) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-white text-black">
                <p className="font-mono">Error: No wallet connected. Please return to the main page.</p>
            </div>
        );
    }

    return (
        <>
            {isAccountModalOpen && <AccountAndSettingsModal wallet={wallet} onClose={() => setIsAccountModalOpen(false)} onMnemonicSet={setUserMnemonic} userMnemonic={userMnemonic} />}
            <div className="flex h-screen w-screen bg-white text-black font-mono">
                
                <main className="flex-grow flex flex-col h-screen relative">
                    <header className="flex-shrink-0 flex items-center h-16 px-6 border-b border-gray-300">
                        <h1 className="font-pixel text-3xl text-gray-600">
                            <span className="select-none">Ra</span><span className="text-purple-500">van</span>
                        </h1>
                    </header>

                    <div className="flex-grow flex flex-col pt-8 pb-32 overflow-y-auto no-scrollbar">
                        <div className="max-w-3xl mx-auto w-full px-4">
                            <div className="space-y-6">
                                {messages.map(msg => <Message key={msg.id} message={msg} />)}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    </div>
                
                    <footer className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                        <div className="max-w-3xl mx-auto">
                            {/* Demo Prompts */}
                            <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 mb-2 font-semibold">Try these commands:</div>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <button
                                        onClick={() => setInput('get the total balance of this address GQCGVTCORNYT7TH5AES7FEV7O2YUGC6LYWD4L6LDCXXMGJJHXCUQYAGUVE')}
                                        className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full hover:bg-purple-100 transition-colors"
                                    >
                                        Check Balance
                                    </button>
                                    <button
                                        onClick={() => setInput('last 10 transaction history of this address HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA')}
                                        className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
                                    >
                                        Transaction History
                                    </button>
                                    <button
                                        onClick={() => setInput('send 22 ALGO to your-friend-address')}
                                        className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full hover:bg-green-100 transition-colors"
                                    >
                                        Send ALGO
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}>
                                <div className="relative bg-white border border-gray-300 rounded-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent overflow-hidden">
                                    {attachedFile && (
                                        <div className="px-4 pt-2 pb-1 border-b border-gray-200 flex justify-between items-center text-sm">
                                            <span className="text-gray-700 font-mono truncate pr-2">{attachedFile.name}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => { setAttachedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                                className="text-gray-500 hover:text-black"
                                                aria-label="Remove attachment"
                                            >
                                                <CloseIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center p-2">
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange}
                                            className="hidden" 
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAttachmentClick}
                                            className="p-2 text-gray-500 hover:text-black transition-colors"
                                            aria-label="Attach file"
                                        >
                                            <PlusIcon className="h-6 w-6" />
                                        </button>
                                        <textarea
                                            ref={textareaRef}
                                            rows={1}
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(input);
                                                }
                                            }}
                                            placeholder="Message Ravan..."
                                            className="w-full bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-0 rounded-2xl py-2 px-2 text-base resize-none max-h-40 no-scrollbar"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() && !attachedFile}
                                            className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-500 transition-all duration-200 active:scale-90 disabled:cursor-not-allowed"
                                            aria-label="Send message"
                                        >
                                            <SendIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                             <p className="text-center text-xs text-gray-500 pt-2 font-sans">Ravan can make mistakes. Consider checking important information.</p>
                        </div>
                    </footer>
                </main>

                <aside className={`flex-shrink-0 bg-white flex flex-col border-l border-gray-300 transition-all duration-300 ease-in-out ${isRightSidebarOpen ? 'w-64' : 'w-20'}`}>
                    <div className={`h-16 flex items-center border-b border-gray-300 transition-all duration-300 ${isRightSidebarOpen ? 'justify-start pl-6' : 'justify-center'}`}>
                        <button
                            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={isRightSidebarOpen ? "Close activity panel" : "Open activity panel"}
                        >
                            <PanelRightOpenIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className={`flex-grow overflow-y-auto no-scrollbar transition-opacity duration-300 ${isRightSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        {isRightSidebarOpen && (
                            <div className="p-4 space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Transaction History</h3>
                                    <div className="space-y-3">
                                        {mockTransactions.map((tx, index) => (
                                            <div key={index} className="flex items-center text-sm p-2 rounded-lg hover:bg-gray-50">
                                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-3 ${tx.type === 'send' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                                    {tx.type === 'send' ? <ArrowUpRightIcon className="w-4 h-4" /> : <ArrowDownLeftIcon className="w-4 h-4" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-black font-semibold">{tx.type === 'send' ? `Sent ${tx.amount} ALGO` : `Received ${tx.amount} ALGO`}</p>
                                                    <p className="text-xs text-gray-500">{tx.type === 'send' ? `to ${tx.recipient}` : `from ${tx.recipient}`}</p>
                                                </div>
                                                <div className="ml-auto text-right flex-shrink-0">
                                                    <p className={`font-bold text-xs ${tx.status === 'Completed' ? 'text-green-400' : 'text-red-400'}`}>{tx.status}</p>
                                                    <p className="text-xs text-gray-600">{tx.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-shrink-0 p-4 border-t border-gray-300">
                        {isRightSidebarOpen ? (
                            <button
                                onClick={() => setIsAccountModalOpen(true)}
                                className="flex items-center gap-3 w-full p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors text-left"
                                aria-label="Open account and settings"
                            >
                                <SettingsCubeIcon className="w-8 h-8 flex-shrink-0" />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-bold text-black truncate">Demo User</p>
                                    <p className="text-xs text-gray-500 truncate">{wallet.address}</p>
                                </div>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center">
                                 <button
                                    onClick={() => setIsAccountModalOpen(true)}
                                    className="p-2 text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                                    aria-label="Open account and settings"
                                >
                                    <SettingsCubeIcon className="w-10 h-10" />
                                </button>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
};

export default ChatPage;
