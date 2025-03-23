import React, { createContext, useState, useEffect } from 'react';
import axios from "../axios.js"


const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios
            .get("/users/is_logged/state")
            .then((response) => {
                setAuth(response.data.answer)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;