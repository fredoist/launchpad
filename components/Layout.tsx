import Head from 'next/head';
import { Header } from './Header';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} — Launchpad</title>
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/launchpad/logo.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="Easily create, launch, and manage your solana programs"
        />
      </Head>
      <Header />
      <div className='mx-5'>
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </div>
    </>
  );
};
