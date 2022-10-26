import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import Head from 'next/head';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  title: string;
  secret?: boolean;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  title,
  secret,
  children,
}) => {
  const wallet = useWallet();

  return (
    <>
      <Head>
        <title>{title} — Launchpad</title>
        <meta name="theme-color" content="#000000" />
        <link
          rel="shortcut icon"
          href="/launchpad/logo.svg"
          type="image/svg+xml"
        />
        <meta
          name="description"
          content="Easily create, launch, and manage your solana programs"
        />
      </Head>
      <Header />
      {!wallet.connected && secret ? (
        <div className="min-h-screen flex items-center justify-center flex-col overflow-hidden p-5">
          <h3 className="font-semibold text-xl mb-12">Please connect to a wallet to access this page</h3>
          <WalletMultiButton className="!bg-black !text-white !rounded-full !px-8" />
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="mx-5">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </>
      )}
    </>
  );
};
