/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfile, getPublications } from '../../api'
import Navigation from '../../components/Navigation'
import Link from 'next/link'
import { ProfileDetailStyle, ProfilePublicationStyle, ImageStyle, ButtonStyle } from '../../components/[id].styles'

export default function SelectedProfile() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState()
  const [date, setDate] = useState()
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchProfile()
      getDate()
    }
  }, [id])


  async function fetchProfile() {
    try {
      const profileRepsonse = await client.query(getProfile, { id }).toPromise()
      const profileData = profileRepsonse.data.profile
      setProfile(profileData)
    } catch (e) {
      console.log('error fetching profile...', e)
    }
  }

  async function getDate() {
    const publicationResponse = await client.query(getPublications, { id }).toPromise();
    if (publicationResponse.data.publications.items.length === 0) {
      return
    }
    const publicationData = publicationResponse.data.publications.items
    setPublications(publicationData)
    const createdAt = publicationResponse?.data.publications.items[0].createdAt
    const convertedDate = new Date(createdAt)
    const fullDate = `${MONTHS[convertedDate.getMonth()]} ${convertedDate.getUTCDate()}`
    setDate(fullDate)
  }

  if (!profile) return null

  return (
    <div className='flex w-screen h-screen'>
      <Navigation />
      <div className='overflow-scroll sm:w-2/3'>
        <div className={ProfileDetailStyle}>
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
            <h4 className='text-lg'>{profile.name} | @{profile.handle.slice(0, -5)}</h4>
          </div>
          <p>{profile.bio}</p>
          <div className='flex items-center place-content-between mt-2'>
            <span>Followers: {profile.stats.totalFollowers} | Following: {profile.stats.totalFollowing}</span>
            <Link key={profile.id} href={`/profiles`}>
              <a>
                <button className={ButtonStyle}>Back</button>
              </a>
            </Link>
          </div>
        </div>
        {
          publications?.map((pub, i) => (
            <div key={i} className={ProfilePublicationStyle}>
              <div className='flex items-center'>
                <img
                  src={profile.picture?.original?.url || profile.picture.uri}
                  alt={profile.handle.slice(0, -4)}
                  className={ImageStyle}
                />
                <span>{profile.name} | @{profile.handle.slice(0, 4)} | {date}</span>
              </div>
              <p>{pub.metadata.content}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}