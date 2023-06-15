import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    // const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert('Incorrect Password for Email');
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an Account</h2>
            <span>Sign Up With your Email & Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    required
                    label='Email'
                    type="email"
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    required
                    label='Password'
                    type="password"
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;