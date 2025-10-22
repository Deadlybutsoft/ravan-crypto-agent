import React, { useState, useEffect, useRef } from 'react';

interface MainPageProps {
    onLaunch: () => void;
}

const features = [
    {
        title: "Connect",
        description: "Connect your wallet in seconds. Use the Demo Wallet to try with testnet ALGO."
    },
    {
        title: "Command",
        description: "Use natural language to tell Ravan what to do. 'Send 10 ALGO to alice.algo'."
    },
    {
        title: "Confirm",
        description: "Ravan interprets your command and executes the transaction on Algorand."
    }
];

const faqs = [
    {
        question: "What is Ravan?",
        answer: "Ravan is an AI-powered crypto agent that understands natural language. You can command it to send ALGO, check balances, and more, just by talking to it."
    },
    {
        question: "Which wallets are supported?",
        answer: "Currently, Ravan has full support for a Demo Wallet using the Algorand testnet. Pera Wallet and MetaMask integrations are planned for the future."
    },
    {
        question: "Is it secure?",
        answer: "Security is our top priority. All transactions require your explicit confirmation. In a production environment, Ravan would interface with secure wallet connectors and would never have direct access to your private keys."
    },
    {
        question: "What technology does it use?",
        answer: "Ravan is built with React, TypeScript, and Tailwind CSS on the frontend. The core AI logic is powered by Google's Gemini API, which interprets user commands and determines the appropriate actions to take."
    }
];


const MainPage: React.FC<MainPageProps> = ({ onLaunch }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7, 
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
                    if (index > -1) {
                        setActiveSection(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentRefs = sectionRefs.current;
        currentRefs.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            currentRefs.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const renderScrollButton = (text: string, primary = true, isFooter = false) => (
        <button
            onClick={onLaunch}
            className={`font-mono font-bold py-6 px-12 text-2xl relative overflow-hidden group transition-all duration-300 ease-in-out ${
                primary 
                ? 'bg-black text-white' 
                : 'border border-black text-black group-hover:border-purple-500'
            } ${isFooter ? 'flex-shrink-0' : ''}`}
        >
            <span className="absolute inset-0 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            <span className="relative z-10 group-hover:text-white">{text}</span>
        </button>
    );

    return (
        <div className="h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden no-scrollbar relative">
            <nav className="fixed right-8 bottom-8 z-20 flex flex-row gap-4">
                {[...Array(3).keys()].map(index => {
                    const activeClasses = 'bg-black';
                    const inactiveClasses = 'border-2 border-gray-400 hover:bg-gray-300';
                    return (
                         <a
                            key={index}
                            href={`#section-${index}`}
                            onClick={(e) => {
                               e.preventDefault();
                               sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`block w-3.5 h-3.5 transition-all duration-300 ${
                                activeSection === index ? activeClasses : inactiveClasses
                            }`}
                            aria-label={`Go to section ${index + 1}`}
                            aria-current={activeSection === index ? 'step' : undefined}
                        />
                    );
                })}
            </nav>

            <section
                id="section-0"
                // Fix: Use a block body for the ref callback to ensure it returns void.
                ref={el => { sectionRefs.current[0] = el; }}
                className="h-screen w-screen snap-start flex flex-col items-center justify-center px-4 bg-white text-black"
            >
                <div className="text-center">
                    <h1 className="font-pixel text-[6rem] sm:text-[9rem] font-normal text-black leading-none">
                        <span className="select-none">Ra</span><span className="text-purple-500">van</span>
                    </h1>
                    <div className="flex justify-center items-center gap-4 my-24">
                        {renderScrollButton("Connect Wallet", true)}
                        {renderScrollButton("Try Demo", false)}
                    </div>
                </div>
            </section>

            <section 
                id="section-1"
                // Fix: Use a block body for the ref callback to ensure it returns void.
                ref={el => { sectionRefs.current[1] = el; }}
                className="h-screen w-screen snap-start flex flex-col items-center justify-center px-4 bg-white text-black"
            >
                 <div className="w-full max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="font-pixel text-6xl md:text-7xl font-bold">How it <span className="text-purple-500">works</span></h2>
                    </div>
                    <div className="scissor-cut bg-white border-2 border-black">
                        <div className="flex flex-col md:flex-row items-stretch justify-center w-full text-center divide-y-2 divide-black md:divide-y-0 md:divide-x-2 md:divide-black">
                            {features.map((feature, index) => (
                                <div 
                                    key={feature.title} 
                                    className="w-full md:w-1/3 px-8 py-16 md:py-0 md:h-80 flex flex-col justify-center group transition-colors duration-300 hover:bg-purple-500 cursor-pointer"
                                >
                                    <h3 className="text-4xl font-bold mb-4 group-hover:text-white">{feature.title}</h3>
                                    <p className="text-gray-700 text-lg group-hover:text-gray-200">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </section>

            <footer 
                id="section-2"
                // Fix: Use a block body for the ref callback to ensure it returns void.
                ref={el => { sectionRefs.current[2] = el; }}
                className="h-screen w-screen snap-start flex flex-col p-8 sm:p-12 md:p-16 bg-white text-black relative"
            >
                <div className="flex justify-between items-start w-full">
                    <h2 className="font-pixel text-6xl md:text-7xl"><span className="select-none">Ra</span><span className="text-purple-500">van</span></h2>
                    {renderScrollButton("Launch Now", true, true)}
                </div>

                <div className="flex-grow w-full flex flex-col items-center justify-center my-8">
                    <div className="w-full max-w-5xl">
                        <h3 className="font-spotify text-4xl md:text-5xl text-center mb-12">Frequently Asked <span className="text-purple-500">Questions</span></h3>
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index} 
                                    className="border-b border-gray-200 py-4 cursor-default font-saira"
                                    onMouseEnter={() => setOpenFaq(index)}
                                    onMouseLeave={() => setOpenFaq(null)}
                                >
                                    <div 
                                        className="w-full flex justify-between items-center text-left text-lg md:text-xl font-bold"
                                    >
                                        <span>{faq.question}</span>
                                        <span className={`transform transition-transform duration-300 text-2xl font-light ${openFaq === index ? 'rotate-45' : 'rotate-0'}`}>
                                            +
                                        </span>
                                    </div>
                                    <div className={`grid transition-all duration-500 ease-in-out ${openFaq === index ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-gray-600 text-base md:text-lg pr-8">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;