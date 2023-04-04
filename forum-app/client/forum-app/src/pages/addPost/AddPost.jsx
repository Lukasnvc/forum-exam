import { Field, Formik } from "formik";
import { SideWrapper, StyledForm, StyledIcon, StyledTextArea, Title, Wrapper } from "./styles";
import { addFormInitialValues, addValidationSchema } from "../../const/formikValidations";

import Button from "../../components/button/Button";
import {FaUserCircle} from 'react-icons/fa'
import FormikInput from "../../components/formikInput/FormikInput";
import { HOME_PATH } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useGetUser } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { usePostQuestion } from "../../hooks/useQuestions";

const AddPost = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserContext);
  const {refetch: userRefetch}=useGetUser(userObject._id)
  const { refetch } = useGetQuestions();
  const {mutateAsync: postQuestion} = usePostQuestion()
  const handleSubmit = async (post) => {
    const question = {
      user_id: userObject._id,
      title: post.title,
      question: post.question
    }
    try {
      await postQuestion(question)
      toast.success("Post added");
      await refetch()
      await userRefetch(userObject._id)
      navigate(HOME_PATH);
    } catch (err) {
      toast.error('Something went wrong')
    }
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


