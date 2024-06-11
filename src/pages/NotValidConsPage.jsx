import React, { useEffect, useState } from 'react'

const NotValidConsPage = ({type}) => {
  const [word,setWord] = useState('')

  useEffect(()=>{
    const typeWords = {
      video: 'видео',
      text: 'текстуална',
      emerg:'итна'
    }

    setWord(typeWords[type] || '')
  },[type])

  return (
    <div className='unauth'>
        <h3>Моментално немате {word ? word : ''} консултација во тек</h3>
    </div>
  )
}

export default NotValidConsPage
