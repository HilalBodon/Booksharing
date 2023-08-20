import React, { useState } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";

function App() {
	// const user = localStorage.getItem("token");
	const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");

	return (
		<Routes>
			{authToken && <Route path="/" exact element={<Main authToken={authToken} />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
    		<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
