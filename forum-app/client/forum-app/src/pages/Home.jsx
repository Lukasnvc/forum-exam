import Card from '../components/Card';
import React from 'react'
import styled from 'styled-components';
import { useGetQuestions } from '../hooks/useQuestions'

const Home = () => {
  const { isLoading, data } = useGetQuestions();
  const questions = data || []
  console.log(questions)
  return (
    <Wrapper>
      {isLoading ? <h1>Loading...</h1> : questions.map((item) => (
        <Card key={item._id} id={item._id} date={item.date} title={item.title} question={item.question} edited={item.edited} answers={item.answers}/>
      ))}
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`