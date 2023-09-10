import { createContext, useContext, useEffect, useReducer } from 'react';


const UserContext = createContext()

const initialState = {
    user : null
};


// Reducer function
const userReducer = (state, action) => {


    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'CLEAR_USER':
            return { ...state, user: null };
        default:
            return state;
    }
};



// User Context Provider
export function UserProvider({ children }) {
    const [userState, dispatch] = useReducer(userReducer, initialState);
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user-data');
        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
        }
    }, []);

      
    return (
        <UserContext.Provider value={{ userState, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}


// hook for access
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('userProfile must be used within a UserProvider');
    }
    return context;
}