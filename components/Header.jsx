import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-b-2 flex flex-row">
            <h1 className="py-4 px-4 text-2xl hover:-rotate-2 text-white ">
                DECENTRALIZED LOTTERY
            </h1>
            <div className="ml-auto  py-4 px-4  ">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
