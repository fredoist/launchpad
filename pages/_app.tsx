import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import 'inter-ui'
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast'

const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider network={network}>
      <WalletModalProvider>
        <Component {...pageProps} />
        <Toaster toastOptions={{ className: '!ring-1 !ring-black/10 !py-2 !px-6 !shadow-none' }} />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
