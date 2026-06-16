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