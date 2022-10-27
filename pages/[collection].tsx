import { useProgram } from '@thirdweb-dev/react/solana';
import { NFT } from '@thirdweb-dev/sdk';
import { NFTCollectionMetadataInput } from '@thirdweb-dev/sdk/solana';
import { Layout } from 'components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CollectionPage: NextPage = () => {
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
    <Layout title={`Collection`}>
      <section className="pt-24 mb-12">
        <div className="relative w-full rounded-xl h-40 bg-gray-100 mb-16">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <Image
              src={metadata?.image}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="blur-3xl"
            />
          </div>
          <div className="absolute left-8 bottom-0 translate-y-1/2 rounded-full overflow-hidden bg-white w-24 h-24">
            <Image
              src={metadata?.image}
              alt={metadata?.name}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
        <h1 className="font-black text-3xl mb-2">{metadata?.name}</h1>
        <p className="max-w-xl">{metadata?.description}</p>
      </section>
      <section className="grid grid-cols-4 gap-5">
        {nfts.length > 0 &&
          nfts.map((nft) => (
            <article key={nft.metadata.id}>
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  src={nft.metadata.image as string}
                  alt={nft.metadata.name as string}
                  width={180}
                  height={180}
                />
              </div>
              <h3 className="font-semibold">{nft.metadata.name}</h3>
            </article>
          ))}
      </section>
    </Layout>
  );
};

export default CollectionPage;
