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
        <title>{title}</title>
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
