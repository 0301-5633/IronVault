import Buttontest from "../components/ButtonTest";
import { useLocation } from 'react-router-dom';

export default function DashboardPage(){
    const access_token = sessionStorage.getItem('access_token'); 
    return (
        <div>
            <div>
                {access_token ? (<> <p>Token: {access_token}</p> </>): (<p></p>)}
            </div>

            <Buttontest />
            <p>
                Lorem Ipsum
            </p>
        </div>
    )
}