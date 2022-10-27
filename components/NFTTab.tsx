import { NFT } from '@thirdweb-dev/sdk';
import Image from 'next/image';

export const NFTTab = ({ data }: { data: NFT[] | undefined }) => {
  return (
    <section className="grid grid-cols-4 grid-flow-dense pb-12">
      {data && data.map((nft) => (
        <article key={nft.metadata.id}>
          <div className="relative w-60 h-60 rounded-xl overflow-hidden">
            <Image
              src={nft.metadata.image as string}
              alt={nft.metadata.name as string}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h3 className="font-semibold mt-4">{nft.metadata.name}</h3>
        </article>
      ))}
    </section>
  );
};
