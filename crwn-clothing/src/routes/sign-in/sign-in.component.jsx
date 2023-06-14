import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const googleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>I'm the sign in COMPONENT</h1>
            <button onClick={googleUser}>Sign In With Google Popup</button>
        </div>
    )
}

export default SignIn;