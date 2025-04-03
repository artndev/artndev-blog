import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';


const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [cookies] = useCookies(["user_data"]); // auto-decoded
    const [auth, setAuth] = useState(
        cookies.user_data || null
    );

    // useEffect(() => {
    //     console.log(auth)
    // }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;