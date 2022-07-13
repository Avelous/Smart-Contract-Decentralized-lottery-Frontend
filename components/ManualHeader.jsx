import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        isWeb3EnableLoading,
    } = useMoralis()
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        // enableWeb3()
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div className="border-b-2 border-gray-600 flex flex-row">
            <h1 className="py-4 px-4 text-2xl hover:-rotate-2 text-white mt-1">
                DECENTRALIZED LOTTERY
            </h1>
            <div className="ml-auto  py-4 px-4  ">
                {account ? (
                    <div className="bg-sky-500/50 text-white  py-2 px-4 rounded">
                        Connected to {account.slice(0, 6)}...
                        {account.slice(account.length - 4)}
                    </div>
                ) : (
                    <button
                        className="bg-sky-500/75
                    hover:bg-sky-500/50 text-white  py-2 px-4 rounded"
                        onClick={async () => {
                            await enableWeb3()
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem(
                                    "connected",
                                    "injected"
                                )
                            }
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    )
}
