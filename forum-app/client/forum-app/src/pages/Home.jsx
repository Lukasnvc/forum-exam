import { useMemo, useState } from 'react';

import Button from '../components/Button';
import Card from '../components/Card';
import {FaSort} from 'react-icons/fa'
import { FallingLines } from 'react-loader-spinner';
import styled from 'styled-components';
import { useGetQuestions } from '../hooks/useQuestions';

const Home = () => {
  const [reversed, setReversed] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const { isLoading, data: questions } = useGetQuestions();

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
        />
      ))
    )}
  </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`

const StyledButtom = styled(Button)`
  font-size: 1rem;
  padding: 5px 10px;
  svg {
    margin-left: 5px;
  }
`

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`