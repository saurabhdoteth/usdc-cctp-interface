import useSmartAccount from "@/hooks/useSmartAccount";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { createSmartAccount } = useSmartAccount();
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <ConnectButton />
      <button className="appearance-none" onClick={() => createSmartAccount()}>
        create
      </button>
    </main>
  );
}
