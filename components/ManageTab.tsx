import { useProgram } from '@thirdweb-dev/react/solana';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export const ManageTab = ({ address }: { address: string }) => {
  const { program } = useProgram(address, 'nft-collection');
  const [preview, setPreview] = useState(null);

  const handleMint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { name, description, image } = form.elements as any;

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const id = program.mint({
            name: name.value,
            description: description.value,
            image: image.files[0],
          });
          resolve(id);
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: 'Minting...',
        success: 'Minted!',
        error: 'Failed to mint',
      }
    );
  };

  const displayNFTPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target.files?.[0] as Blob;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="pb-12">
      <h3 className="font-semibold text-lg mb-5">Mint a new token</h3>
      <form onSubmit={handleMint} className="flex flex-col gap-4 max-w-md">
        <label
          htmlFor="nft-image"
          className="relative flex items-center justify-center bg-gray-100 rounded-xl w-24 h-24 cursor-pointer overflow-hidden"
        >
          {preview && (
            <picture>
              <source srcSet={preview} type="image/png" />
              <img src={preview} alt="Preview Image" className="absolute inset-0" />
            </picture>
          )}
          Image
        </label>
        <input
          type="file"
          name="image"
          id="nft-image"
          accept="image/*"
          onChange={displayNFTPreview}
          hidden
        />
        <FormInput name="name" label="Name" />
        <FormInput name="description" label="Description" />
        <button
          type="submit"
          className="py-3 px-8 bg-black text-white rounded-full"
        >
          Mint
        </button>
      </form>
    </section>
  );
};

type FormInputProps = {
  label: string;
  name: string;
  className?: string;
};

const FormInput: React.FC<FormInputProps> = ({ name, label, className }) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      className="p-2 rounded-xl border border-black/20 w-full mb-5 mt-2"
    />
  </div>
);
