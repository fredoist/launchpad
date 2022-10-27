import { useNFTs, useProgram, useProgramMetadata } from '@thirdweb-dev/react/solana';
import { NFT } from '@thirdweb-dev/sdk';
import { NFTCollectionMetadataInput } from '@thirdweb-dev/sdk/solana';
import { Layout } from 'components/Layout';
import { ManageTab } from 'components/ManageTab';
import { NFTTab } from 'components/NFTTab';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const tabs = ['NFTs', 'Manage', 'Analytics'];

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const collection = router.query.collection as string;
  const { program } = useProgram(collection, 'nft-collection');
  const { data: metadata } = useProgramMetadata(program)
  const { data: nfts } = useNFTs(program);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Layout title={`Collection`}>
      <section className="pt-24 mb-5">
        <div className="relative w-full rounded-xl h-40 bg-gray-100 mb-16">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <Image
              src={metadata?.image as string}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="blur-3xl"
            />
          </div>
          <div className="absolute left-8 bottom-0 translate-y-1/2 rounded-full overflow-hidden bg-white w-24 h-24">
            <Image
              src={metadata?.image as string}
              alt={metadata?.name as string}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
        <h1 className="font-black text-3xl mb-2">{metadata?.name}</h1>
        <p className="max-w-xl">{metadata?.description}</p>
      </section>
      <div className="flex gap-2 border-b border-black/5 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${
              tabs[currentTab] === tab
                ? 'border-black'
                : 'border-transparent'
            } text-sm font-semibold inline-block py-1 px-2 border-b-2`}
            onClick={() => setCurrentTab(tabs.indexOf(tab))}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs[currentTab] === 'NFTs' && <NFTTab data={nfts} />}
      {tabs[currentTab] === 'Manage' && <ManageTab address={collection as string} />}
    </Layout>
  );
};

export default CollectionPage;
