import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';

const Collection: NextPage = () => {
  return (
    <Layout title="Stage" secret>
      <section className="pt-32 pb-12">
        <h1 className="text-3xl font-bold">Stage for app</h1>
      </section>
      <section className='flex gap-2 border-b border-black/5'>
        <Link href="">
          <a className='py-1 px-2 border-b-2 border-black'>Collection</a>
        </Link>
      </section>
    </Layout>
  );
}

export default Collection;
