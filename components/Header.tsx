import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebar } from 'stores/sidebar';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const Header = () => {
  const wallet = useWallet();

  /** Temporary add react-confetti effect */
  const { width, height } = useWindowSize();

  return (
    <header className="fixed top-0 inset-x-0 z-10 bg-white/50 backdrop-blur">
      <div className="text-center p-2 bg-blue-700 text-white text-sm relative overflow-hidden">
        <Confetti width={width} height={height} opacity={0.8} />
        🎉 Launchpad won 2nd place for Solanathon!
        <a
          href="https://twitter.com/thirdweb/status/1590101360925495296"
          target="_blank"
          rel="noopener noreferrer"
          className="underline uppercase ml-2 font-semibold"
        >
          see announcement
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
