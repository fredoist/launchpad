import {
  useNFTs,
  useProgram,
  useProgramMetadata,
} from '@thirdweb-dev/react/solana';
import { Layout } from 'components/Layout';
import { ManageTab } from 'components/ManageTab';
import { NFTTab } from 'components/NFTTab';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Tab } from '@headlessui/react';

const tabs = ['NFTs', 'Manage', 'Analytics'];

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const collection = router.query.collection as string;
  const { program } = useProgram(collection, 'nft-collection');
  const { data: metadata } = useProgramMetadata(program);
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
      <Tab.Group>
        <Tab.List className="flex gap-2 border-b border-black/5 mb-12">
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'border-black font-medium' : 'border-transparent'
              } focus:outline-none border-b-2 py-1 px-2`
            }
          >
            NFTs
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'border-black font-medium' : 'border-transparent'
              } focus:outline-none border-b-2 py-1 px-2`
            }
          >
            Manage
          </Tab>
          <Tab
            disabled
            className={({ selected }) =>
              `${
                selected ? 'border-black font-medium' : 'border-transparent'
              } focus:outline-none border-b-2 py-1 px-2 cursor-not-allowed opacity-50`
            }
          >
            Analytics
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <NFTTab data={nfts} />
          </Tab.Panel>
          <Tab.Panel>
            <ManageTab address={collection as string} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
};

export default CollectionPage;
