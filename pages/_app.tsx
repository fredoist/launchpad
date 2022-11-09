import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import 'inter-ui'
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider network={network}>
      <WalletModalProvider>
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
