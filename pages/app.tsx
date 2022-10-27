import { useSDK } from '@thirdweb-dev/react/solana';
import { RegisteredProgram } from '@thirdweb-dev/sdk/solana';
import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const App: NextPage = () => {
  const sdk = useSDK();
  const [programs, setPrograms] = useState<RegisteredProgram[]>([]);

  useEffect(() => {
    sdk?.registry
      .getDeployedPrograms(sdk.wallet.getAddress() as string)
      .then((programs) => setPrograms(programs));
  });

  return (
    <Layout title="Dashboard" secret>
      <section className="pt-32 pb-12">
        <h1 className="text-3xl font-bold">Collections</h1>
      </section>
      <section className="grid grid-cols-4 gap-5">
        {programs.length > 0 &&
          programs.map(
            ({
              programAddress: address,
              programName: name,
              programType: type,
            }) => (
              <Link key={address} href={`/${address}`}>
                <article className="p-4 ring-1 ring-black/5 rounded-xl hover:ring-black/20 flex flex-col gap-2 cursor-pointer">
                  <h3 className="font-semibold">{name}</h3>
                  <span className="text-sm">{type}</span>
                </article>
              </Link>
            )
          )}
      </section>
    </Layout>
  );
};

export default App;
