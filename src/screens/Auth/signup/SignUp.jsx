import { useEffect, useState } from 'react';
import { CognitoAPIHelper } from '../../../services/aws/cognito/CognitoAPIHelper';
import SignUpForm from './SignUpForm'
import ConfirmationCodeModal from '../ConfirmationCodeModal';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  const navigate = useNavigate();
  const [signupError, setSignupErrorError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignUp = async (values) => {
    try {
      let { email, password, ...allowedAttributes } = values
      const attributes = CognitoAPIHelper.getCognitoAttributesArrayFromObject(allowedAttributes)
      await CognitoAPIHelper.userSignUp(email, password, attributes)
      setIsModalVisible(true)
    } catch (error) {
      setSignupErrorError(error.message)
    }
  }

  const handleConfirmation = async ({ confirmationCode }) => {
    try {
      await CognitoAPIHelper.confirmUserSignUp(confirmationCode)
      navigate('/auth/login')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div style={{ width: '350px' }}>
      <ConfirmationCodeModal
        isOpen={isModalVisible}
        handleConfirmation={handleConfirmation}
      />
      <SignUpForm signupError={signupError} handleSignUp={handleSignUp} />
    </div>
  )
}
export default SignUp;
