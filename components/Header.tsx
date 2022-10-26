import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebar } from 'stores/sidebar';

export const Header = () => {
  const wallet = useWallet()

  return (
    <header className="fixed top-0 inset-x-0 p-5 z-10 bg-white/50 backdrop-blur">
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
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
