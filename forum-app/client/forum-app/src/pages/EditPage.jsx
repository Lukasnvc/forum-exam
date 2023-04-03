import { inputBgColor, primaryColor, shadow } from "../assets/colors-shadows";

import Button from "../components/Button";
import Card from "../components/Card";
import {FaUserCircle} from 'react-icons/fa'
import { FallingLines } from 'react-loader-spinner';
import { HOME_PATH } from "../routes/consts";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { useContext } from "react";
import { useGetQuestions } from "../hooks/useQuestions";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate()
  const { userObject } = useContext(UserContext)
  const { isLoading, data: questions } = useGetQuestions();
  const filteredQuestions = questions && questions.filter((question) => question.user_id === userObject._id);

  return (
    <Container>
      <LeftSide>
        <div>
          <h2>Welcome</h2>
          <StyledIcon><FaUserCircle/></StyledIcon>
          <h3>{userObject.name} {userObject.last_name}</h3>
          <MyQuestions onClick={()=> navigate(HOME_PATH)}>ALL QUESTIONS</MyQuestions>
          <p>Your questions: {userObject.questions.length}</p>
          <p>Your answers: {userObject.answers.length}</p>
          <p>Liked posts: {userObject.liked_posts.length}</p>
        </div>
      </LeftSide>
      <Wrapper>
        <h1>Your Questions</h1>
        {isLoading ?
          <LoaderWrapper>
            <FallingLines
              color="#0165E1"
              width="200"
              visible={true}
              ariaLabel='falling-lines-loading'
            />
          </LoaderWrapper>
          : filteredQuestions.map((item) => (
        <Card key={item._id} id={item._id} date={item.date} title={item.title} question={item.question} edited={item.edited} answers={item.answers} user_id={item.user_id}/>
      ))}
        </Wrapper>
    </Container>
  )
}

export default EditPage

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`

const Container = styled.div`
  display: flex;
  gap: 50px;
`

const LeftSide = styled.div`
 min-width: 200px;
  div {
    box-shadow: ${shadow};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    height: 100vh;
    padding: 20px;
    background-color: ${inputBgColor};
    h2{
      margin: 50px 0;
    }
    h3{
      text-transform: capitalize;
      margin-bottom: 20px;
    }
  }
`

const StyledIcon = styled.span`
  font-size: 4rem;
  color: ${primaryColor};
  margin-top: 30px;
`

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MyQuestions = styled(Button)`
  padding: 5px 10px;
  font-size: 1rem;
`