import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  return (
    <Layout title="Easily create, launch, and manage your solana programs">
      <section className='py-40 text-center'>
        <h1 className='text-3xl lg:text-6xl font-black mb-12'>Easily create, launch, and manage your solana programs</h1>
        <Link href="/app">
          <a className="py-4 px-8 bg-black text-white rounded-full inline-block font-semibold">
            Get started
          </a>
        </Link>
      </section>
    </Layout>
  );
};

export default Home;
