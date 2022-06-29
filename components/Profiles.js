import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from './Navigation'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  const CONSTANT_BIO = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    console.log('fetchingProfiles has been called')
  }

  if (!profiles) return null

  const profileItemStyle = `
  p-8
  bg-white
  shadow-custom
  rounded-lg
  w-10/12
  ml-8
  mt-4
  mb-8
  `

  return (
    <div className='flex h-screen'>
      <Navigation />
      <div className='w-2/3 flex justify-center items-center'>
        <h3 className=''>Profiles loaded here...</h3>
      </div>
    </div>
  )
}
