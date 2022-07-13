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
                // style={{
                //     backgroundImage:
                //         "url(" +
                //         "https://media.istockphoto.com/photos/empty-dark-blue-studio-room-with-light-and-shadow-abstract-background-picture-id1339787499?b=1&k=20&m=1339787499&s=170667a&w=0&h=psnH04yZpoVzxa4xTZt4hDwff5WiO0cQrtnYdRttkSI=" +
                //         ")",
                //     backgroundPosition: "center",
                //     backgroundSize: "cover",
                //     backgroundRepeat: "no-repeat",
                //     height: "100%",
                // }}
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
