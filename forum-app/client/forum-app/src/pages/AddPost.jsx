import { Field, Form, Formik } from "formik";
import { addFormInitialValues, addValidationSchema } from "../components/const/formikValidations";
import { bgColor, cardsBg, inputBgColor, primaryColor, shadow } from "../assets/colors-shadows";

import Button from "../components/Button";
import {FaUserCircle} from 'react-icons/fa'
import FormikInput from "../components/FormikInput";
import { HOME_PATH } from "../routes/consts";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useGetQuestions } from "../hooks/useQuestions";
import { useNavigate } from "react-router-dom";
import { usePostQuestion } from "../hooks/useQuestions";

const AddPost = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserContext);
  const { refetch } = useGetQuestions();
  const {mutateAsync: postQuestion} = usePostQuestion()
  const handleSubmit = (post) => {
    const question = {
      user_id: userObject._id,
      title: post.title,
      question: post.question
    }
    postQuestion(question)
    toast.success("Post added");
    refetch()
    navigate(HOME_PATH);
  };
  return (
    <Wrapper>
      <SideWrapper>
        <div>
        <h2>Welcome</h2>
        <StyledIcon><FaUserCircle/></StyledIcon>
          <span>{userObject.name} {userObject.last_name}</span>
        </div>
        <p>Most of your questions can by answered by comunity, just formulate it correctly ;)</p>
        </SideWrapper>
      <Formik
        initialValues={addFormInitialValues}
        onSubmit={handleSubmit}
        validationSchema={addValidationSchema}>
        <StyledForm>
          <Title>Feel free to ask</Title>
          <FormikInput name="title" type="text" placeholder="Title" />
          <Field name="question" as={StyledTextArea} placeholder="Write your question here ..." />
          <Button isBlue type="submit">
            Submit question
          </Button>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};

export default AddPost;

const Wrapper = styled.div`
  width: fit-content;
  background-color: ${cardsBg};
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
  padding: 40px;
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  /* background-color: ${bgColor}; */
  box-shadow: ${shadow};
  margin-top: 100px;
`;

const SideWrapper = styled.div`
  max-width: 300px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
    text-align: center;
    font-weight: 600;
    text-transform: capitalize;
  }
  }
  p {
    text-align: center;
    text-indent: 15px;
    line-height: 1.6;
    font-size: 1.2rem;
    font-style: italic;
  }
`

const StyledForm = styled(Form)`
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

const Title = styled.p`
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 10px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  background-color: ${inputBgColor};
  padding: 10px 14px;
  border: none;
  outline: none;
`;

const StyledIcon = styled.span`
  font-size: 5rem;
  color: ${primaryColor};
  margin-top: 30px;
`
