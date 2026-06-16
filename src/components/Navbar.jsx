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