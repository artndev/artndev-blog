import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './Auth.jsx';


const AdminContext = createContext({});
export const AdminProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [admin, setAdmin] = useState(
        auth ? auth.is_admin : null
    );

    // useEffect(() => {
    //     console.log(admin)
    // }, [admin]);

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            { children }
        </AdminContext.Provider>
    );
};

export default AdminContext;