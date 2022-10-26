import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { sidebar } from 'stores/sidebar';

export const Sidebar = () => {
  const visible = sidebar.use();

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
        <form>
          <div className="relative bg-gray-50 h-32 rounded-xl border border-dashed border-black/20 mb-16">
            <label
              htmlFor="cover"
              className="absolute inset-0 inline-flex items-center justify-center flex-col gap-2 cursor-pointer"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="text-sm">Add a cover image</span>
            </label>
            <label
              htmlFor="image"
              className="absolute left-5 bottom-0 translate-y-1/2 inline-flex items-center justify-center cursor-pointer w-20 h-20 rounded-full bg-white border border-dashed border-black/20"
            >
              <PlusIcon className="w-6 h-6" />
            </label>
          </div>
          <input type="file" name="image" id="image" hidden />
          <input type="file" name="cover" id="cover" hidden />
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
          <button className="block bg-black text-white p-3 mt-5 w-full rounded-full">
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
