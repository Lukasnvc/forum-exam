import * as Yup from "yup";

import {FaRegThumbsUp, FaWindowClose} from 'react-icons/fa'
import { FiEdit, FiFileText } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { HOME_PATH, LOGIN_PATH, POST_PATH } from '../routes/consts';
import { generatePath, useNavigate } from 'react-router-dom';
import { hoverColor, inputBgColor, primaryColor, secondaryColor, shadow } from "../assets/colors-shadows";
import { useContext, useState } from 'react';

import Answer from "./Answer";
import Button from './Button';
import {RiDeleteBin2Line} from 'react-icons/ri'
import { UserContext } from '../contexts/UserContext';
import { postAnswer } from "../api/answersApi";
import styled from "styled-components"
import { toast } from "react-hot-toast";
import { useDeleteQuestion } from "../hooks/useQuestions";
import { useGetQuestions } from "../hooks/useQuestions";

const answerFormInitialValues = {
  answer: "",
};

const answerValidationSchema = Yup.object().shape({
  answer: Yup.string().required("Required"),
});

const Card = ({ id, date, title, question, answers, edited = false, user_id }) => {
  const { refetch } = useGetQuestions();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const { isLoggedIn, userObject, setChange } = useContext(UserContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const navigatePath = (id) => {
    const path = generatePath(POST_PATH, { id });
    navigate(path)
  }

  const handleSubmit = async (x) => {
    setChange(prevValue => !prevValue)
    const { answer } = x
    const post = {
      answer: answer,
      user_id: userObject._id
    }
    try {
      const response = await postAnswer( post, id);
      toast.success('Answer posted')
      navigate(HOME_PATH)
      setShow(false)
      refetch()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = () => {
    deleteQuestion(id)
    toast.success("Post deleted");
    refetch()
  }

  
  return (
    <Wrapper>
      <Post>
        <PostTop>
          <span>Created: {date}</span>
          <div>
            {edited ? <span>Edited <FiEdit /></span> : <span>Not edited <FiFileText /></span>}
            {user_id === userObject._id ? <Delete onClick={handleDelete}/> : <>{isLoggedIn && <Like><FaRegThumbsUp/></Like>}</>}
          </div>
        </PostTop>
        <PostBotom>
          <h3 onClick={() => navigatePath(id)}>{title}</h3>
          <p>{question}</p>
          <Buttons>
            {isLoggedIn ? (
              <Button onClick={() => {setShow(true)}} isBlue>Comment</Button>
            ) : 
            <Button onClick={() => navigate(LOGIN_PATH)}>Login for commenting</Button>}
          </Buttons>
        </PostBotom>
      </Post>
      {show && (
        <>
        <Formik
        initialValues={answerFormInitialValues}
        onSubmit={handleSubmit}
      validationSchema={answerValidationSchema}
        >
            <StyledForm>
              <FaWindowClose onClick={() => setShow(false)}/>
          <Field name="answer" as={StyledTextArea} placeholder="Write your answer here ..." />
          <Button isBlue type="submit">
            Submit answer
          </Button>
        </StyledForm>
        </Formik>
        </>
      )
      }
      {answers.length > 0 && <Answer answers={answers} /> }
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
  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
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
  h3 {
    text-transform: uppercase;
    text-align: center;
    margin: 0 50px;
    padding-bottom: 10px;
    overflow-y: hidden;
    border-bottom: 1px solid ${primaryColor};
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid ${secondaryColor};
      color: ${secondaryColor};
    }
  }
  p {
    text-transform: capitalize;
    text-indent: 15px;
    line-height: 1.5;
    overflow-x: scroll;
    max-height: 200px;
  }
`


const StyledForm = styled(Form)`
  position: relative;
margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
  svg {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${primaryColor};
    cursor: pointer;
    &:hover {
      color: ${hoverColor};
    }
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  background-color: ${inputBgColor};
  overflow-x: scroll;
  padding: 15px 14px;
  border: none;
  outline: none;
`

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  Button {
    font-size: 1rem;
    padding: 5px 15px;
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
  font-size: 1.1rem;
  transition: 300ms;
  &:hover {
    color: ${hoverColor};
  }
`