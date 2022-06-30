/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfile } from '../../api'
import Navigation from '../../components/Navigation';

export default function SelectedProfile() {
  const [profile, setProfile] = useState()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])


  async function fetchProfile() {
    try {
      const response = await client.query(getProfile, { id }).toPromise();
      const profileData = response.data.profile
      setProfile(profileData)

    } catch (e) {
      console.log('error fetching profile...', e)
    }
  }

  if (!profile) return null

  const profileDetailStyle = `
  p-8
  bg-white
  shadow-custom
  rounded-lg
  ml-8
  mr-16
  mb-8
  w-10/12
  `

  const profilePublicationStyle = `
  m-4
  p-8
  bg-white
  shadow-custom
  rounded-lg
  ml-8
  mr-16
  mb-6
  w-10/12
  `

  return (
    <div className='flex w-screen h-screen'>
      <Navigation />
      <div className='sm:w-2/3'>
        <div className={profileDetailStyle}>
          <img
            src={profile.picture?.original?.url || profile.picture.uri}
            alt={profile.handle}
            className='mr-1 sm:h-20 sm:w-20 h-10 w-10 rounded-full mb-3'
          />
          <h4>{profile.handle}</h4>
          <p>{profile.bio}</p>
          <p>Followers: {profile.stats.totalFollowers}</p>
          <p>Following: {profile.stats.totalFollowing}</p>
        </div>
      </div>
    </div>
  )
}