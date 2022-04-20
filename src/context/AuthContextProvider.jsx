import { createContext, useContext } from "react";
import { useLocalStorage } from "../helpers/useLocalStorage.js"
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config.js";


const AuthContext = createContext([]);

export const useAuthContext = () => useContext(AuthContext);

function AuthContextProvider({ children }) {

    const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [resetEmail, setResetEmail] = useState("");
	const [user, setUser] = useState({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
		});
		return unsubscribe;
	}, []);

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			)
			console.log(user)
		} catch (error) {
			console.log(error.message);
		}
	}

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			)
			console.log(user)
		} catch (error) {
			console.log(error.message);
		}
	}

	const forgotPassword = async () => {
		try {
			const response = await sendPasswordResetEmail(
				auth,
				resetEmail,
				{ url: 'http://localhost:3000/authentication'}
			)
			console.log(response)
		} catch (error) {
			alert('You must provide a valid email');
			console.log(error.message);
		}
	}

	const loginGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const user = await signInWithPopup(
				auth,
				provider)
			console.log(user)
		} catch (error) {
			console.log(error.message);
		}
	}

	const logout = async () => {
		await signOut(auth);
	}

    return (
        <AuthContext.Provider value={{
            setRegisterEmail,
            setRegisterPassword,
            setLoginEmail,
            setLoginPassword,
			setResetEmail,
            register,
            login,
			loginGoogle,
            logout,
			forgotPassword,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider