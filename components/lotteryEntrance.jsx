import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis() // This returns the hex value
    const chainId = parseInt(chainIdHex)
    const lotteryAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "TX Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="h-screen">
            <div className=" p-5 grid place-items-center h-1/2 text-white">
                {lotteryAddress ? (
                    <div className="grid place-items-center">
                        <button
                            className="bg-sky-500/75
                            hover:bg-sky-500/50 text-white  py-2 px-4 rounded"
                            onClick={async function () {
                                await enterLottery({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                <div>Enter Lottery</div>
                            )}
                        </button>
                        <table className=" grid place-items-center">
                            <tbody className="mb-1 mt-2">
                                <tr><td>
                                    Entrance Fee: {""}
                                    { ethers.utils.formatUnits(
                                        entranceFee,
                                        "ether"
                                    )}
                                    ETH
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody className=" grid place-items-center mt-5">
                                <tr className="text-xl text-sky-400"><td>
                                    Number of Players: {numPlayers}</td>
                                </tr>
                                <tr className="text-3xl "><td>Recent Winner:</td></tr>

                                <tr><td>{recentWinner}</td></tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div> No Lottery Address Detected </div>
                )}
            </div>
        </div>
    )
}
