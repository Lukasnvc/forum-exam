import Card from '../components/Card'
import React from 'react'
import styled from 'styled-components'
import { useOneQuestion } from '../hooks/useQuestions'
import { useParams } from 'react-router-dom'

const Post = () => {
  const { id } = useParams()
  const { data, isLoading } = useOneQuestion(id)
  const item = data[0] || []
console.log(data, isLoading)
  return (
    <Wrapper>
      <h1>{id}</h1>
      <Card id={item._id} date={item.date} title={item.title} question={item.question} edited={item.edited} answers={item.answers}/>
    </Wrapper>
  )
}

export default Post

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`