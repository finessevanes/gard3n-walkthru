/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { client, getProfile, getPublications } from '../../api'
import Navigation from '../../components/Navigation'
import { ProfileDetailStyle, ProfilePublicationStyle, ImageStyle, ButtonStyle } from '../../components/[id].styles'
import Image from 'next/image'

export default function SelectedProfile({ profile, publications, date }) {

  const router = useRouter()

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
                <Image
                  placeholder="blur"
                  src={profile.picture?.original?.url || profile.picture.uri}
                  alt={profile.handle.slice(0, -4)}
                  width={80}
                  height={80}
                  className='rounded-full'
                  blurDataURL='https://media.barchart.com/news/authors/default-user.png'
                />
              ) : (
                <div className={ImageStyle + `bg-gray-500`}>
                </div>
              )
            }
            <h4 className='text-lg ml-2'>{profile.name} | @{profile.handle.slice(0, -5)}</h4>
          </div>
          <p className='mt-2'>{profile.bio}</p>
          <div className='flex items-center place-content-between mt-2'>
            <span>Followers: {profile.stats.totalFollowers} | Following: {profile.stats.totalFollowing}</span>
            <button onClick={() => router.push('/profiles')} className={ButtonStyle}>Back</button>
          </div>
        </div>
        {
          publications?.map((pub, i) => (
            <div key={i} className={ProfilePublicationStyle}>
              <div className='flex items-center'>
                <Image
                  placeholder="blur"
                  src={profile.picture?.original?.url || profile.picture.uri}
                  alt={profile.handle.slice(0, -4)}
                  width={60}
                  height={60}
                  className='rounded-full'
                  blurDataURL='https://media.barchart.com/news/authors/default-user.png'
                />
                <span className='ml-2'>{profile.name} | @{profile.handle.slice(0, 4)} | {date}</span>
              </div>
              <p className='mt-2'>{pub.metadata.content}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const { id } = context.query

  try {
    const profileRepsonse = await client.query(getProfile, { id }).toPromise()
    const publicationResponse = await client.query(getPublications, { id }).toPromise()
    const profileData = profileRepsonse.data.profile
    const publicationData = publicationResponse.data.publications.items
    const createdAt = publicationResponse.data.publications.items[0].createdAt
    const convertedDate = new Date(createdAt)
    const fullDate = `${MONTHS[convertedDate.getMonth()]} ${convertedDate.getUTCDate()}`

    return {
      props: {
        profile: profileData,
        publications: publicationData,
        date: fullDate
      }
    }
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      '': ''
    }
  }
}