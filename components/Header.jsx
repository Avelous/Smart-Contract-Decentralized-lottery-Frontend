import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-b-2 flex flex-row   border-stone-900 h-15 max-h-18">
            <h1 className="py-4 px-4 mt-2 text-4rem hover:-rotate-2 font-semibold">
                DECENTRALIZED LOTTERY
            </h1>
            <div className="ml-auto  py-4 px-4  ">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
