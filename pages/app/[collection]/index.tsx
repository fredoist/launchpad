import { useProgram } from '@thirdweb-dev/react/solana';
import { NFT } from '@thirdweb-dev/sdk';
import { NFTCollectionMetadataInput } from '@thirdweb-dev/sdk/solana';
import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Collection: NextPage = () => {
  const router = useRouter();
  const collection = router.query.collection as string;
  const { program } = useProgram(collection, 'nft-collection');
  const [metadata, setMetadata] = useState<NFTCollectionMetadataInput>();
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    program?.getMetadata().then((metadata: any) => setMetadata(metadata));
    program?.getAll().then((nfts: any) => setNfts(nfts));
  }, [program]);

  return (
    <Layout title={`Stage for ${metadata?.name}`} secret>
      <section className="pt-32 pb-12 flex items-center gap-4">
        <h1 className="text-3xl font-bold">Stage for {metadata?.name}</h1>
        <button className="py-1 px-5 bg-black text-white rounded-full text-sm">Mint</button>
      </section>
      <section className='grid grid-cols-4 gap-5'>
        {nfts.length > 0 && nfts.map((nft) => (
          <article className='ring-1 ring-black/5 rounded-xl' key={nft.metadata.id}>
            <img src={nft.metadata.image} alt={nft.metadata.name} className="w-full" />
            <h2 className='p-4 border-t border-black/5'>{nft.metadata.name}</h2>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Collection;
