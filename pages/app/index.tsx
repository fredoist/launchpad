import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';

const App: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <section className="pt-32 pb-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </section>
      <section className="grid grid-cols-4 gap-5">
        <Link href="/app/stage" passHref>
          <article className="p-4 ring-1 ring-black/5 rounded-xl hover:ring-black/20 flex flex-col gap-2 cursor-pointer">
            <h3 className="font-semibold">Collection Name</h3>
            <span>A collection description</span>
          </article>
        </Link>
      </section>
    </Layout>
  );
}

export default App;
