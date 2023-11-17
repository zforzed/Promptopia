'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
      const fetchPosts = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        setPosts(data)
      }

      fetchPosts()
    },[])

  const handleSearchChange = async(e) => {
    const search =  e.target.value
    console.log(e.target.value)

    const reg = new RegExp(searchText,'i')

    setSearchResults([])
    setSearchText(search)

    posts.map(post=> {
      if (post.prompt.match(reg) || post.tag.match(reg) || post.creator.username.match(reg)) {
        searchResults.length === 0 ?
        setSearchResults([post]) : setSearchResults(prev =>[...prev,post])
      }     
    })
  }
  
  const handleTagClick = (tag) => {
    const reg = new RegExp(tag,'i')

    setSearchResults([])
    setSearchText(tag)

    posts.map(post=> {
      if (post.prompt.match(reg) || post.tag.match(reg) || post.creator.username.match(reg)) {
        searchResults.length === 0 ?
        setSearchResults([post]) : setSearchResults(prev =>[...prev,post])
      }     
    })
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          className='search_input peer'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList
        data={ searchText.length > 1 ? searchResults : posts }
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed