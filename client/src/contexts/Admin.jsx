import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "../axios.js"
import AuthContext from './Auth.jsx';


const AdminContext = createContext({});
export const AdminProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        axios
            .get("/users/is_admin/state")
            .then((response) => {
                setAdmin(response.data.answer)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [auth]);

    return (
        <AdminContext.Provider value={{ admin }}>
            { children }
        </AdminContext.Provider>
    );
};

export default AuthContext;