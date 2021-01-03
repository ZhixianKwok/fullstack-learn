import React,{ useState } from 'react'
import PropTypes from 'prop-types'

export default function CreateBlog({ handleOnCreate }) {

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const handleOnClick = () => {
    handleOnCreate({ title,author,url })
  }

  const handleOnChange = (e) => {
    switch(e.target.attributes['data-input'].value){
    case 'title':
      setTitle(e.target.value)
      break
    case 'author':
      setAuthor(e.target.value)
      break
    case 'url':
      setUrl(e.target.value)
      break
    }
  }

  return (
    <div>
      <div><span>title:</span><input type="text" data-input="title" onChange={handleOnChange}/></div>
      <div><span>author:</span><input type="text" data-input="author" onChange={handleOnChange}/></div>
      <div><span>url:</span><input type="text" data-input="url" onChange={handleOnChange}/></div>
      <input type="button" value="create" onClick={handleOnClick}/>
    </div>
  )
}

CreateBlog.propTypes = {
  handleOnClick: PropTypes.func.isRequired
}