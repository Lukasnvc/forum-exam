import {FaRegThumbsUp, FaThumbsUp} from 'react-icons/fa'
import { FiEdit, FiFileText } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { cardsBg, hoverColor, inputBgColor, primaryColor, secondaryColor, shadow } from "../assets/colors-shadows";
import { deleteAnswer, patchAnswer } from '../api/answersApi';
import { useContext, useState } from 'react';

import Button from './Button';
import { FaArrowUp } from 'react-icons/fa';
import { GoCommentDiscussion } from 'react-icons/go';
import {RiDeleteBin2Line} from 'react-icons/ri'
import { UserContext } from '../contexts/UserContext';
import { answerValidationSchema } from './const/formikValidations';
import { patchLikesPostsUser } from '../api/usersApi';
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useGetQuestions } from '../hooks/useQuestions';

const Answer = ({ answers }) => {
  const { isLoggedIn, userObject } = useContext(UserContext);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [show, setShow] = useState(false);
  const { refetch } = useGetQuestions();

  const handleDelete = (id) => {
    deleteAnswer(id);
    toast.success("Answer deleted");
    refetch();
  };

  const handleEdit = async (id, post) => {
    try {
      await patchAnswer(id, post)
      setEditedAnswer("");
      refetch()
      toast.success("Answer have been edited")
    } catch (err) {
      toast.error('Something went wrong')
    }
  };

  const handleLike = async (ansId) => {
    const type = { type: "answer" }
    // console.log(userObject._id, ansId, type)
    try {
      await patchLikesPostsUser(userObject._id, ansId, type)
      toast.success("Liked Question")
      refetch()
    } catch (err) {
      toast.error('Something went wrong')
    }
  }


  const isLiked = (id) => {
    return answers.some((ans) =>
      userObject.liked_posts?.some((post) => post.postId === id && post.type === "answer")
    );
  }
 
  
  const last = answers.length - 1;
  return (
    <Wrapper>
      {show ? (
        <>
          <StyledMin onClick={() => setShow(false)} />
          {answers.map((ans) => (
            <Comment key={ans._id}>
              <CommentTop>
                {ans.user_id === userObject._id ? (
                  
                  <Delete onClick={() => handleDelete(ans._id)} />
                   
                ) : (
                  <>{isLoggedIn &&
                      <> {isLiked(ans._id) ? <Like><FaThumbsUp /></Like> : <Like onClick={() => handleLike(ans._id)}><FaRegThumbsUp /></Like>} </>}
                    </>
                )}
                <div>
                  {ans.user_id === userObject._id && <>{editedAnswer===ans._id ?  <StyledButtom onClick={() => setEditedAnswer('')}>
                      Cancel
                    </StyledButtom>:  <StyledButtom onClick={() => setEditedAnswer(ans._id)}>
                      Edit
                  </StyledButtom>}
                  </>}
                
                {ans.edited ? (
                  <span>Edited <FiEdit /></span>
                ) : (
                  <span>Not edited <FiFileText /></span>
                  )}
                  </div>
              </CommentTop>
              <CommentBottom>
                {editedAnswer === ans._id ? (
                  <Formik
                    initialValues={{ answer: ans.answer }}
                    onSubmit={(values) => handleEdit(ans._id, { answer: values.answer })}
                    validationSchema={answerValidationSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <StyledForm onSubmit={handleSubmit}>
                        <Field
                          name="answer"
                          as={StyledTextArea}
                          placeholder="Write your answer here ..."
                        />
                        <Button isBlue type="submit">
                          Save Changes
                        </Button>
                      </StyledForm>
                    )}
                  </Formik>
                ) : (
                  <p>{ans.answer}</p>
                )}
              </CommentBottom>
            </Comment>
          ))}
        </>
      ) : (
        <>
          <Comment key={answers[last]._id}>
            <CommentTop>
              <span>
                {answers.length}
                <StyledShow onClick={() => setShow(true)} />
              </span>
              {answers[last].edited ? (
                <span>Edited <FiEdit /></span>
              ) : (
                <span>Not edited <FiFileText /></span>
              )}
            </CommentTop>
            <CommentBottom>
              <p>{answers[last].answer}</p>
            </CommentBottom>
          </Comment>
        </>
      )}
    </Wrapper>
  );
};

export default Answer;

const Comment = styled.div`
  width: 100%;
  background-color: ${cardsBg};
  box-shadow: ${shadow};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const CommentTop = styled.div`
  margin: 0;
  background-color: ${inputBgColor};
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
  }
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
    top: 30px;
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

const StyledButtom = styled(Button)`
  font-size: 1rem;
  padding: 5px 10px;
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