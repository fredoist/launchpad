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
      <section className="pt-24">
        <div className="relative w-full rounded-xl h-32 bg-gray-100">
          <div className="absolute inset-0">
            {/* <Image
              src={metadata?.cover}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            /> */}
          </div>
          <div className="absolute left-12 bottom-0 translate-y-1/2 rounded-full overflow-hidden bg-white">
            <Image
              src={metadata?.image}
              alt={metadata?.name}
              width={80}
              height={80}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionPage;
