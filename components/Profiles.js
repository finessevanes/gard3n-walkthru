import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import {
  client,
  getRecommendedProfiles
 } from '../api'
 import Link from 'next/link'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  const CONSTANT_BIO = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  useEffect(() => {
    fetchRecommendedProfiles()
  }, [])

  async function fetchRecommendedProfiles() {
    try {
      const response = await client.query(getRecommendedProfiles).toPromise()
      const recommendedProfiles = response.data.recommendedProfiles
      setProfiles(recommendedProfiles)
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
      {
          profiles.map((profile, i) => (
              <Link key={i} href={`/profile/${profile.id}`}>
                  <div className={profileItemStyle}>
                    {
                      profile.picture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.picture?.original?.url || profile.picture.uri}
                          alt={profile.handle}
                          className='h-20 w-20 rounded-full mb-3'
                        />
                      ) : (
                        <div className='h-20 w-20 rounded-full bg-gray-500'>
                        </div>
                      )
                    }
                    <h4>{profile.handle}</h4>
                    <p className='text-xs'>{profile.bio ? profile.bio : CONSTANT_BIO}</p>
                  </div>
              </Link>
          ))
        }
      </div>
    </div>
  )
}
