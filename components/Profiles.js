import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import {
  client,
  getRecommendedProfiles
 } from '../api'
 import Link from 'next/link'
 import { ProfileItemStyle, ImageStyle} from './Profiles.styles'

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

  if (!profiles) return null

  return (
    <div className='flex w-screen h-screen'>
      <Navigation/>
      <div className='overflow-scroll sm:w-2/3'>
      {
          profiles.map((profile, i) => (
              <Link key={i} href={`/profile/${profile.id}`}>
                  <div className={ ProfileItemStyle }>
                    <div className='flex items-center'>
                    {
                      profile.picture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.picture?.original?.url || profile.picture.uri}
                          alt={profile.handle}
                          className={ImageStyle}
                        />
                      ) : (
                        <div className={ImageStyle + `bg-gray-500`}>
                        </div>
                      )
                    }
                    <h4>{profile.handle}</h4>
                    </div>
                    <p className='text-xs'>{profile.bio ? profile.bio : CONSTANT_BIO}</p>
                  </div>
              </Link>
          ))
        }
      </div>
    </div>
  )
}
