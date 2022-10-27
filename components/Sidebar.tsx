/* eslint-disable @next/next/no-img-element */
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useSDK } from '@thirdweb-dev/react/solana';
import { ChangeEvent, FormEvent, useState } from 'react';
import { sidebar } from 'stores/sidebar';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

type FormElements = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  symbol: HTMLInputElement;
  description: HTMLTextAreaElement;
  image: HTMLInputElement;
};

export const Sidebar = () => {
  const visible = sidebar.use();
  const router = useRouter();
  const sdk = useSDK();
  const [preview, setPreview] = useState(null);

  const createCollection = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { name, symbol, description, image } =
      form.elements as FormElements;

    toast
      .promise(
        new Promise(async (resolve, reject) => {
          try {
            const collection = await sdk?.deployer.createNftCollection({
              name: name.value,
              symbol: symbol.value,
              description: description.value,
              image: image.files?.[0],
            });
            resolve(collection);
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: 'Creating collection...',
          success: 'Collection created!',
          error: 'Failed to create collection',
        }
      )
      .then((collection) => {
        form.reset();
        setPreview(null);
        sidebar.toggle();
        router.push(`/${collection}`);
      });
  };

  const displayPreview = (e: ChangeEvent<HTMLInputElement>) => {
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
    <>
      <aside
        className={`${
          visible ? '-translate-x-0' : 'translate-x-full'
        } transition-transform duration-100 ease-in-out fixed right-0 inset-y-0 z-50 bg-white ring-1 ring-black/5 w-full max-w-sm p-5`}
      >
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-semibold text-xl">Collection Details</h2>
          <button className="p-2" onClick={sidebar.toggle}>
            <span className="sr-only">Close Sidebar</span>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={createCollection}>
          <div className="relative bg-gray-50 h-32 rounded-xl border border-dashed border-black/20 mb-16">
            <div
              className="absolute inset-0 overflow-hidden rounded-xl"
            >
              {preview && (
                <img
                  src={preview}
                  alt="Cover preview"
                  className="absolute inset-0 blur-3xl"
                />
              )}
            </div>
            <label
              htmlFor="image"
              className="absolute left-5 bottom-0 translate-y-1/2 inline-flex items-center justify-center cursor-pointer w-20 h-20 rounded-full bg-white border border-dashed border-black/20 overflow-hidden"
            >
              {preview && (
                <img
                  src={preview}
                  alt="Image preview"
                  className="absolute inset-0"
                />
              )}
              <PlusIcon className="w-6 h-6" />
            </label>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={displayPreview}
            hidden
          />
          <div className="flex gap-5">
            <FormInput label="Name" name="name" />
            <FormInput label="Symbol" name="symbol" className="w-1/3" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="p-4 w-full border border-black/20 rounded-xl"
            />
          </div>
          <button
            type="submit"
            className="block bg-black text-white p-3 mt-5 w-full rounded-full"
          >
            Create collection
          </button>
        </form>
      </aside>
      <div
        onClick={sidebar.toggle}
        className={`${
          visible ? 'block' : 'hidden'
        } fixed inset-0 bg-white/50 backdrop-blur z-40`}
      />
    </>
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
