import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebar } from 'stores/sidebar';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

export const Header = () => {
  const wallet = useWallet();

  /** Temporary add react-confetti effect */
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem('confetti') !== 'seen'
    ) {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      localStorage.setItem('confetti', 'seen');
    }
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-10 bg-white/50 backdrop-blur">
      <Confetti width={size.width} height={size.height} recycle={false} />
      <div className="text-center p-1 bg-blue-700 text-white text-sm">
        Launchpad ended up as 2nd place for Solanathon! 🎉{' '}
        <a
          href="https://twitter.com/thirdweb/status/1590101360925495296"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          see announcement
        </a>
        {' or '}
        <a
          href="https://fredoist.substack.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          subscribe for updates
        </a>
      </div>
      <nav className="mx-auto max-w-6xl flex items-center justify-between py-4 px-5">
        <Link href="/app">
          <a>
            <span className="sr-only">App Homepage</span>
            <Image
              src="/launchpad/logo.svg"
              alt="Logo"
              width={58}
              height={20}
            />
          </a>
        </Link>
        <button
          className="py-2 px-6 rounded-full inline-block bg-black text-white text-sm disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!wallet.connected}
          onClick={sidebar.toggle}
        >
          Launch
        </button>
      </nav>
    </header>
  );
};
