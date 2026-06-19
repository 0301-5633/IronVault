// This component defines the navigation bar (sidebar) for the application. 
// It uses React Router's NavLink to create links to different pages (Dashboard, Entries, Categories, Members). 
// The NavLink component allows us to apply active styles to the currently active link. 
// The sidebar also includes a logo and the application name "IronVault". 
import { NavLink } from 'react-router-dom';
import vault from '../assets/vault.png';
export default function Navbar() 
{
    return (
    <nav className="sidebar">
        <div className="sidebar-logo">
            <NavLink to="/">
                <img src={vault} alt="Vault" />
                <span>Iron<strong>Vault</strong></span>
            </NavLink>
        </div>
        <div className="sidebar-nav">
            <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
            <NavLink to="/entries" className="sidebar-link">Entries</NavLink>
            <NavLink to="/categories" className="sidebar-link">Categories</NavLink>
            <NavLink to="/members" className="sidebar-link">Members</NavLink>
        </div>
    </nav>
    );
}