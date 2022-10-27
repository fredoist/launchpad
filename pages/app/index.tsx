import { useSDK } from '@thirdweb-dev/react/solana';
import { RegisteredProgram } from '@thirdweb-dev/sdk/solana';
import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const App: NextPage = () => {
  const sdk = useSDK();
  const [collections, setCollections] = useState<RegisteredProgram[]>([]);

  useEffect(() => {
    sdk?.registry
      .getDeployedPrograms(sdk.wallet.getAddress() as string)
      .then((programs) => setCollections(programs));
  }, []);

  return (
    <Layout title="Dashboard" secret>
      <section className="pt-32 pb-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </section>
      <section className="grid grid-cols-4 gap-5">
        {collections.map((collection) => (
          <Link key={collection.programAddress} href="/app" as={`/app/${collection.programAddress}`}>
            <article className="p-4 ring-1 ring-black/5 rounded-xl hover:ring-black/20 flex flex-col gap-2 cursor-pointer">
              <h3 className="font-semibold">{collection.programName}</h3>
            </article>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default App;
