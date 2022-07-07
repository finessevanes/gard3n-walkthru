import { useState, useEffect } from 'react'
import Profiles from '../pages/Profiles'
import Image from 'next/image'
import { ButtonStyle, TitleStyle } from './Login.styles'
import Link from 'next/link'

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

  return (
    <div>
      {currentAccount ? (
          <Link href="/profiles" passHref>
            <Profiles />
          </Link>
      ) : (
        <div className='pt-80 text-center'>
          <Image src="/gard3n-logo-02.svg" height={300} width={300} alt='gard3n-logo' />
          <h1 className={TitleStyle}>GARD3N</h1>
          <button className={ButtonStyle} onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )
      }
    </div>
  )
};

export default Login
