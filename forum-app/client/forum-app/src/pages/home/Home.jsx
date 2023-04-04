import {Container, LeftSide, LoaderWrapper, MyQuestions, StyledButtom, StyledIcon, Wrapper} from "./styles"
import {FaSort, FaUserAltSlash} from 'react-icons/fa'
import { useContext, useMemo, useState } from 'react';

import Card from '../../components/card/Card';
import { EDIT_PATH } from '../../routes/consts';
import {FaUserCircle} from 'react-icons/fa'
import { FallingLines } from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import { useGetQuestions } from '../../hooks/useQuestions';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../../hooks/UseUserUpdate';

const Home = () => {
  const { userObject, isLoggedIn } = useContext(UserContext)
  const [reversed, setReversed] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const { isLoading, data: questions } = useGetQuestions();
  const navigate = useNavigate()
  if (isLoggedIn) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateUser(userObject._id)
  }

  const sortQuestions = (sortOrder) => {
    setSortBy(sortOrder);
    if (sortOrder === "newest") {
      setReversed(false);
    } else if (sortOrder === "oldest") {
      setReversed(true);
    }
  };

  const sortedQuestions = useMemo(() => {
    if (sortBy === "newest") {
      return questions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      return questions.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      return questions;
    }
  }, [questions, sortBy]);

  return (
    <Container>
      <LeftSide>
        {isLoggedIn ? (<div>
          <h2>Welcome</h2>
          <StyledIcon><FaUserCircle/></StyledIcon>
          <h3>{userObject.name} {userObject.last_name}</h3>
          <MyQuestions onClick={()=> navigate(EDIT_PATH)}>MY QUESTIONS</MyQuestions>
          <p>Your questions: {userObject.questions.length}</p>
          <p>Your answers: {userObject.answers.length}</p>
          <p>Liked: {userObject.liked_posts.length}</p>
        </div>)
          :
          (<div>
            <h2>Welcome</h2>
            <StyledIcon><FaUserAltSlash /></StyledIcon>
            <h3>Your not logged in</h3>
            <p>Login for full functionality</p>
            <p>Ask and answer questions</p>
            <p>Be part of the comunity</p>
          </div>)
        }
      </LeftSide>
    <Wrapper>
      <div>
        {!reversed ? <StyledButtom onClick={() => sortQuestions("oldest")}>Sort by oldest<FaSort/></StyledButtom> : <StyledButtom onClick={() => sortQuestions("newest")}>Sort by newest<FaSort/></StyledButtom>}
    </div>
      {isLoading ? (
        <LoaderWrapper>
          <FallingLines
            color="#0165E1"
            width="200"
            visible={true}
            ariaLabel='falling-lines-loading'
          />
        </LoaderWrapper>
    ) : (
      sortedQuestions.map((item) => (
        <Card
          key={item._id}
          id={item._id}
          date={item.date}
          title={item.title}
          question={item.question}
          edited={item.edited}
          answers={item.answers}
          user_id={item.user_id}
          comment={false}
        />
      ))
    )}
      </Wrapper>
      </Container>
  )
}

export default Home


