import ErrorMessage from "../errorMessage/ErrorMessage";

import { Link } from "react-router-dom";


const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'margin': '20px 0', 'fontSize': '35px', 'color': '#9F0013' }}>Page not found, Error 404</p>
            <Link to='/' style={{ 'display': 'block', 'textAlign': 'center', 'fontSize': '28px' }}> Back to main </Link>
        </div>
    )
}

export default Page404;