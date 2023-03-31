import { FiEdit, FiFileText } from 'react-icons/fi';
import { inputBgColor, primaryColor, secondaryColor, shadow } from "../assets/colors-shadows";

import Button from './Button';
import { LOGIN_PATH } from '../routes/consts';
import { UserContext } from '../contexts/UserContext';
import styled from "styled-components"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ date, question, answers, edited }) => {
  const { isLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Post>
        <PostTop>
          <span>Created: {date}</span>
          {edited ? <span>Edited <FiEdit/></span> : <span>Not edited <FiFileText/></span>}
        </PostTop>
        <PostBotom>
          <p>{question}</p>
          <Buttons>
            {isLoggedIn ? (
              <Button isBlue>Comment</Button>
            ) : 
            <Button onClick={() => navigate(LOGIN_PATH)}>Login for commenting</Button>}
            
          </Buttons>
        </PostBotom>
      </Post>
      {answers.map((ans) => (
        <Comment key={ans._id}>
          <CommentTop>
            {ans.edited ? <span>Edited <FiEdit/></span> : <span>Not edited <FiFileText/></span>}
          </CommentTop>
          <CommentBottom><p>{ans.answer}</p></CommentBottom>
        </Comment>
      ))}
    </Wrapper>
  )
}

export default Card

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Post = styled.div`
  width: 100%;
  box-shadow: ${shadow};
  border: 3px solid ${primaryColor};
  
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const PostTop = styled.div`
  background-color: ${inputBgColor};
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  span {
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 1rem;
    }
  }
`
const PostBotom = styled.div`
padding: 20px;
  p {
    text-transform: capitalize;
    text-indent: 15px;
    line-height: 1.5;
    overflow-x: scroll;
    max-height: 200px;
  }
`
const Comment = styled.div`
  width: 90%;
  box-shadow: ${shadow};
  border: 3px solid ${secondaryColor};
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const CommentTop = styled.div`
  margin: 0;
  background-color: ${inputBgColor};
  padding: 5px 20px;
  display: flex;
  justify-content: end;
  span {
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 1rem;
    }
  }
`

const CommentBottom = styled.div`
padding: 0 20px;
  p {
    text-transform: capitalize;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: end;
  Button {
    font-size: 1rem;
    padding: 5px 15px;
  }
`