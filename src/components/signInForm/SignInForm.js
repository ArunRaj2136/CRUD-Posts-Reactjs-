import Button from "../button/Button";
import { FcGoogle } from "react-icons/fc";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import "./SignInForm.scss";

const SignInForm = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>SignIn with Google</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="buttons-container">
            <Button
              type="button"
              buttonType="google"
              onClick={signInWithGoogle}
            >
              <FcGoogle />

              <h3>Google Sign In</h3>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
