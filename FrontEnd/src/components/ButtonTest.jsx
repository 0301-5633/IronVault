import { useState } from "react";
import { apiRequest } from "../services/api";

function ButtonTest() {
    const [data, setData] = useState(null);

    async function handleClick() {
        try {
            const result = await apiRequest("/api/dbtest");

            setData(result);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                Test API
            </button>

            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default ButtonTest;