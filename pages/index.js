import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/lotteryEntrance"

export default function Home() {
    return (
      
            <div
                className="flexbox w-screen bg-cyan-800 px-4"
             
            >
                <Head>
                    <title>Smart Contract Lottery</title>
                    <meta
                        name="description"
                        content="Our Smart Contract Lottery"
                    />
                    <link rel="icon" href="" />
                </Head>
                <div>
                    {/* <ManualHeader /> */}
                    <Header />
                    <LotteryEntrance />
                </div>
            </div>
   
    )
}
