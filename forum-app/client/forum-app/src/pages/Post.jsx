import React, { useEffect, useState } from 'react'

import Card from '../components/Card'
import { FallingLines } from 'react-loader-spinner';
import { fetchOneQuestion } from '../api/questionsApi'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Post = () => {
  const [item, setItem] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchOneQuestion(id)
    .then((questionData) => {
      setItem(questionData[0])
    })
    .catch((error) => {
      console.error(error)
    })
}, [])
 
  return (
    <>
      {item.length !== 0 ? (
        <Wrapper>
      <Card id={item._id} date={item.date} title={item.title} question={item.question} edited={item.edited} answers={item.answers} comment={true}/>
      </Wrapper>
      )
        : (
        <LoaderWrapper>
          <FallingLines
            color="#0165E1"
            width="200"
            visible={true}
            ariaLabel='falling-lines-loading'
          />
        </LoaderWrapper>
    )}
    </>
  )
}

export default Post

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`
const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`