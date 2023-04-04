import {Container, LeftSide, LoaderWrapper, MyQuestions, StyledIcon, Wrapper} from "./styles"

import Card from "../../components/card/Card";
import {FaUserCircle} from 'react-icons/fa'
import { FallingLines } from 'react-loader-spinner';
import { HOME_PATH } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useGetQuestions } from "../../hooks/useQuestions";
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

