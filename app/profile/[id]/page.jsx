'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const UserProfile = ({params}) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      await setPosts(data)
    }

    if (params?.id) fetchPosts()
  },[])
  
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s exceptional prompts and be inspired by the power if their imagination`}
      data={posts}      
    />
  )
}

export default UserProfile