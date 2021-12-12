import React, {useState, useEffect,useCallback} from 'react'
import { auth } from '../../firebase'
import FirebaseClass from '../../firebase'
export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState()
    const [cases,setCases] = useState({
        negativeCases:0,
        positiveCases:0
    })
    let signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    let login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    let logout = () => {
        return auth.signOut();
    }
    const handleUpdates = useCallback(async() => {
        const dbObj = new FirebaseClass();
        try {
            const [pc,nc] = await dbObj.predictionNumbers(user?._delegate?.uid)
            setCases({
                negativeCases:nc,
                positiveCases:pc
            })
        }
        catch (e) {
            console.log(e)
        }
    },[user])

    useEffect(() => {
        let unsub = auth.onAuthStateChanged((user) => {
            console.log('new user state -> ', user)
            setUser(user)
        })
        return () => {
            unsub();
        }
    }, [])

    const store = {
        signup,
        login,
        logout,
        user,
        cases,
        handleUpdates,
    }

    return (
        <>
            <AuthContext.Provider value={store}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

