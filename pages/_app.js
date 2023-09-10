import { useEffect } from "react";
import { UserProvider } from '../app/context/userContext';
import { initUserState } from "./api/auth";

function MyApp({ Component, pageProps }) {

    useEffect(() => {
        console.log("_app")
    }, []);

    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
  
export default MyApp;