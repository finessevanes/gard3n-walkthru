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

  const profileItemStyle = `
  p-8
  bg-white
  shadow-custom
  rounded-lg
  w-10/12
  ml-8
  mt-4
  mb-8
  cursor-pointer
  `

  if (!profiles) return null

  return (
    <div className='flex w-screen h-screen'>
      <Navigation />
      <div className='overflow-scroll w-2/3'>
      </div>
    </div>
  )
}
