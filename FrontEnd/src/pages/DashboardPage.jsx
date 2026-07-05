// import Buttontest from "../components/ButtonTest";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

// this can be replaced with an API call to fetch entries from the backend
const mockEntries = [
	{ id: 1, website: "Google", username: "vault1234@gmail.com", category: "Personal", logo: "https://www.google.com/favicon.ico" },
	{ id: 2, website: "Netflix", username: "vaultnex", category: "Entertainment", logo: "https://www.netflix.com/favicon.ico" },
	{ id: 3, website: "Amazon", username: "vaultAma", category: "Shopping", logo: "https://www.amazon.com/favicon.ico" },
	{ id: 4, website: "GitHub", username: "adriangit", category: "Work", logo: "https://www.github.com/favicon.ico" },
	{ id: 5, website: "Spotify", username: "vaultspot", category: "Entertainment", logo: "https://www.spotify.com/favicon.ico" },
];



export default function DashboardPage(){
    // const access_token = sessionStorage.getItem('access_token'); 
    const { user } = useContext(AuthContext);
	const [searchTerm, setSearchTerm] = useState("");       
	const [entries, setEntries] = useState([]);             
	const [loading, setLoading] = useState(true);
    
    // useEffect can be used to fetch data from an API when the component mounts.
    useEffect(() => {
        setTimeout(() => {
            setEntries(mockEntries);
            setLoading(false);
        }, 500);
        }, [setEntries, setLoading]);
        

    const fielterEntries = entries.filter(entry => 
        entry.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
		entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
		entry.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

    if (loading) {
		return <div className="dashboard"><p>Loading entries...</p></div>;
	}
        // <div>
        //     <div>
        //         {access_token ? (<> <p>Token: {access_token}</p> </>): (<p></p>)}
        //     </div>

        //     <Buttontest />
        //     <p>
        //         Lorem Ipsum
        //     </p>
        // </div>
        return (
            <div className="dashboard">
                {user && <p className="welcome-text">Welcome, {user.email}</p>}
                <div className="dashboard-controls">
                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search entries..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {fielterEntries.length === 0 ? (
                    <div className="empty-state">
                        <p>No entries found</p>
                    </div>
                ) : ( <div className="entries-grid">
                    {fielterEntries.map((entry) => (
                        <div key={entry.id} className="entry-card">
                            <div className="entry-card-header">
                                <img
                                            src={entry.logo}
                                            alt={entry.website}
                                            className="entry-logo"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                        <span className="entry-website">{entry.website}</span>
                            </div>
                            <div className="entry-card-body">
                                <p className="entry-username">{entry.username}</p>
                                <span className={"entry-category category-${entry.category.toLowerCase()}"}>{entry.category}
                                    {entry.category}
                                </span>
                            </div>

                            <div className="entry-card-footer">
                                <div className="entry-actions">
                                    <button title="Edit">✏️</button>
                                    <button title="Delete">🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
      );
}