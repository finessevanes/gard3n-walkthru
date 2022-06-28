import { useState, useEffect } from 'react'
import Link from 'next/link'
import Profiles from '../components/Profiles'
import Image from 'next/image'

const Login = () => {
  const [currentAccount, setCurrentAccount] = useState('')

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    console.log('checkIfWalletIsConnected was called')
  }

  const connectWallet = async () => {
    console.log('connectWallet was called')
  }

  const ButtonStyle = `
    bg-lens-300
    hover:bg-green-600
    text-white
    py-3
    px-5
    rounded-full
    shadow-custom
    mt-40
    `

  const TitleStyle = `
    text-bold drop-shadow-xl
    text-4xl
    font-sans
    `

  return (
    <div>
      { currentAccount ? (
        <Profiles />
        ) : (
            <div className='pt-80 text-center'>
            <Image src="/gard3n-logo-02.svg" height={300} width={300} alt='gard3n-logo' />
            <h1 className={TitleStyle}>gard3n</h1>
            <button className={ButtonStyle} onClick={connectWallet}>Connect Wallet</button>
            </div>
        )
      }
    </div>
  )
};

export default Login
