import { FiEdit, FiFileText } from 'react-icons/fi';
import { hoverColor, inputBgColor, primaryColor, secondaryColor, shadow } from "../assets/colors-shadows";
import { useContext, useState } from 'react';

import { FaArrowUp } from 'react-icons/fa';
import {FaRegThumbsUp} from 'react-icons/fa'
import { GoCommentDiscussion } from 'react-icons/go';
import {RiDeleteBin2Line} from 'react-icons/ri'
import { UserContext } from '../contexts/UserContext';
import { deleteAnswer } from '../api/answersApi';
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useGetQuestions } from '../hooks/useQuestions';

const Answer = ({ answers }) => {
  const { isLoggedIn, userObject } = useContext(UserContext)
  const [show, setShow] = useState(false)
  const { refetch } = useGetQuestions();

  const handleDelete = (id) => {
    deleteAnswer(id)
    toast.success("Answer deleted");
    refetch()
  }
  return (
    <Wrapper>
      {show ? (
        <>
            <StyledMin onClick={() => setShow(false)}/>
          {answers.map((ans) => (
            <Comment key={ans._id}>
              <CommentTop>
              {ans.user_id === userObject._id ? <Delete onClick={() => handleDelete(ans._id)}/> : <>{isLoggedIn && <Like><FaRegThumbsUp/></Like>}</>}
                {ans.edited ? <span>Edited <FiEdit /></span> : <span>Not edited <FiFileText /></span>}
              </CommentTop>
              <CommentBottom><p>{ans.answer}</p></CommentBottom>
            </Comment>
          ))}
        </>)
        :
        (
          <>
            <Comment key={answers[0]._id}>
              <CommentTop>
                <span>{answers.length}<StyledShow onClick={() => setShow(true)} />
                </span>
                {answers[0].edited ?
                  <span>Edited <FiEdit /></span>
                  :
                  <span>Not edited <FiFileText /></span>}
              </CommentTop>
              <CommentBottom><p>{answers[0].answer}</p></CommentBottom>
            </Comment>
          </>
        )}
        </Wrapper>
  )
}

export default Answer

const Comment = styled.div`
  width: 100%;
  box-shadow: ${shadow};
`

const CommentTop = styled.div`
  margin: 0;
  background-color: ${inputBgColor};
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const CommentBottom = styled.div`
padding: 0 20px;
  p {
    text-indent: 10px;
    text-transform: capitalize;
    overflow: scroll;
    max-height: 150px;
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

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid ${secondaryColor};
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: ${shadow};
`

const StyledMin = styled(FaArrowUp)`
   position: absolute;
    color: ${primaryColor};
    font-size: 2.2rem;
    bottom: 10px;
    right: -45px;
    cursor: pointer;
    &:hover {
      color: ${hoverColor};
    }
`

const StyledShow = styled(GoCommentDiscussion)`
  color: ${primaryColor};
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
      color: ${hoverColor};
    }
`

const Like = styled.div`
  svg{
    color: ${primaryColor};
  }
  cursor: pointer;
  &:hover {
    svg{
      color: ${hoverColor};
    }
    }
`

const Delete = styled(RiDeleteBin2Line)`
  color: ${primaryColor};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    color: ${hoverColor};
  }
`