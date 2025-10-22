
import React from 'react';

// Official Pera Wallet Logo SVG
export const PeraWalletIcon: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 0L0 37.1928V111.578L64 128L128 111.578V37.1928L64 0Z" fill="#FFEE55"/>
        <path d="M64 128L0 111.578V37.1928L64 0V128Z" fill="#FFDC00"/>
        <path d="M64 30.5L32 48.75V85.25L53.3333 96.5L64 102.25L74.6667 96.5L96 85.25V48.75L64 30.5Z" fill="#1A1A1A"/>
        <path d="M64 30.5L32 48.75V85.25L53.3333 96.5L64 102.25V30.5Z" fill="black"/>
    </svg>
);

// Official MetaMask Logo SVG
export const MetaMaskIcon: React.FC = () => (
    <svg width="48" height="48" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 273.6 259.3">
        <defs>
            <linearGradient id="linear-gradient" x1="163.9" y1="131.5" x2="122.6" y2="189.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#e2761b" />
                <stop offset="1" stopColor="#f6851b" />
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="126.3" y1="144" x2="94.9" y2="191.1" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#e2761b" />
                <stop offset="1" stopColor="#f6851b" />
            </linearGradient>
            <linearGradient id="linear-gradient-3" x1="102" y1="131.5" x2="60.7" y2="189.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#e2761b" />
                <stop offset="1" stopColor="#f6851b" />
            </linearGradient>
            <linearGradient id="linear-gradient-4" x1="147.6" y1="144" x2="116.2" y2="191.1" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#e2761b" />
                <stop offset="1" stopColor="#f6851b" />
            </linearGradient>
        </defs>
        <title>MetaMask</title>
        <path d="M213.4,2.9,153.2,63.1,119.5,29.8Z" fill="#e2761b" />
        <path d="M213.4,2.9,119.5,29.8,128.5,73.1l24.7-10Z" fill="#e4761b" />
        <path d="M119.5,29.8,59.3,90,87.4,128.9,128.5,73.1Z" fill="#e4761b" />
        <path d="M128.5,73.1,87.4,128.9l36.3,44.1,29.5-109.9Z" fill="#e4761b" />
        <path d="M87.4,128.9,59.3,90,18.8,101.4l9.8,62.2Z" fill="#e4761b" />
        <path d="M123.7,173,87.4,128.9,28.6,163.6,42.4,228.6Z" fill="#d7c1b3" />
        <path d="M123.7,173,42.4,228.6l58.4,29.5Z" fill="#233447" />
        <path d="M123.7,173,100.8,258.1l68.5-26.7Z" fill="#cd6116" />
        <path d="M185.1,128.5,123.7,173l45.6,58.4,79.8-67.8Z" fill="#cd6116" />
        <path d="M185.1,128.5,249.1,163.2l5.2-73.2-40.6.4Z" fill="#cd6116" />
        <path d="M153.2,63.1,123.7,173l61.4-44.5L214.6,90.4Z" fill="#f6851b" />
        <path d="M213.4,2.9l1.2,87.5-61.4-27.3Z" fill="#f6851b" />
        <path d="M59.3,90,18.8,101.4,25.2,110.6Z" fill="#763d16" />
        <path d="M28.6,163.6,25.2,110.6,18.8,101.4Z" fill="#763d16" />
        <path d="M249.1,163.2l-34.5-72.8,40.6-.4Z" fill="#763d16" />
        <polygon points="123.7 173 153.2 63.1 128.5 73.1 123.7 173" fill="url(#linear-gradient)" />
        <polygon points="87.4 128.9 128.5 73.1 119.5 29.8 87.4 128.9" fill="url(#linear-gradient-2)" />
        <polygon points="123.7 173 87.4 128.9 28.6 163.6 123.7 173" fill="url(#linear-gradient-3)" />
        <polygon points="123.7 173 185.1 128.5 214.6 90.4 123.7 173" fill="url(#linear-gradient-4)" />
    </svg>
);

// Demo Wallet Icon
export const DemoWalletIcon: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7ZM20 19H4V12H20V19ZM20 9H4V10H20V9Z" fill="#8B5CF6"/>
        <path d="M17 14H19V16H17V14Z" fill="#8B5CF6"/>
    </svg>
);

// Send Icon
export const SendIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);

// User Icon
export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

// Ravan Icon (Agent Icon)
export const RavanIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5C14.5 7.5 16.5 9.5 16.5 12C16.5 14.5 14.5 16.5 12 16.5ZM12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5C13.38 14.5 14.5 13.38 14.5 12C14.5 10.62 13.38 9.5 12 9.5Z" fill="currentColor"/>
    </svg>
);

// Plus Icon (replaces paperclip)
export const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

// Microphone Icon
export const MicrophoneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
    </svg>
);

// New Chat Icon
export const NewChatIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

// Copy Icon
export const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

// Close Icon
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Google Icon
export const GoogleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.06-6.06C15.652,4.636,19.656,2,24,2c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,2.053,29.268,0,24,0C12.955,0,4,8.955,4,20c0,2.659,0.522,5.2,1.44,7.481L6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.343-11.303-8H2.389v8.38C6.588,41.043,14.783,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,36.566,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

// Mail Icon
export const MailIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

// PanelRightOpen Icon
export const PanelRightOpenIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>
    </svg>
);

// ArrowUpRight Icon (for sending crypto)
export const ArrowUpRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

// ArrowDownLeft Icon (for receiving crypto)
export const ArrowDownLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="17" y1="7" x2="7" y2="17"></line>
        <polyline points="17 17 7 17 7 7"></polyline>
    </svg>
);

// Settings Cube Icon
export const SettingsCubeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#34D399', stopOpacity: 1}} /> {/* green-400 */}
                <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} /> {/* purple-500 */}
            </linearGradient>
        </defs>
        <path d="M21 16V8L12 2L3 8V16L12 22L21 16Z" stroke="url(#cubeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.27 8L12 13L20.73 8" stroke="url(#cubeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V13" stroke="url(#cubeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
