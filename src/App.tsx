import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    console.log(process.env.VITE_FIREBASE);
    return (
        <div className="App">
            <h1>Fire base App</h1>
        </div>
    );
}

export default App;
