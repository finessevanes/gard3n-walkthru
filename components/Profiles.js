import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import {
  client,
  getRecommendedProfiles
 } from '../api'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  const CONSTANT_BIO = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  useEffect(() => {
    fetchRecommendedProfiles()
  }, [])

  async function fetchRecommendedProfiles() {
    try {
      const response = await client.query(getRecommendedProfiles).toPromise()
      console.log(response.data.recommendedProfiles)
    } catch(e){
      console.log(e)
    }
  }

  if (!profiles) return null

  return (
    <div className='flex h-screen'>
      <Navigation />
      <div className='w-2/3 flex justify-center items-center'>
        <h3 className=''>Profiles loaded here...</h3>
      </div>
    </div>
  )
}
