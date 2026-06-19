// This component defines the top bar of the application. It displays the title of the current page based on the URL path and includes links for user authentication (Login and Sign Up). 
// The useLocation hook from React Router is used to access the current URL path, which is then mapped to a corresponding title using the topbarTitles object. 
// The top bar also includes navigation links to the authentication page, allowing users to easily access the login and signup forms.
import {NavLink, useLocation} from 'react-router-dom';

const topbarTitles = {
    '/dashboard': 'Dashboard',
    '/entries': 'Entries',
    '/categories': 'Categories',
    '/members': 'Members',
};

export default function Topbar() 
{
    const location = useLocation();
    const title = topbarTitles[location.pathname];

    return (
        <header className="topbar">
            <h1 className="topbar-title">{title}</h1>

            <div className="topbar-auth">
                <NavLink to="/auth" className="btn-login">
                    Login
                </NavLink>
                <NavLink to="/auth" className="btn-signup">
                    SignUp
                </NavLink>
            </div>
        </header>
        
    );
}