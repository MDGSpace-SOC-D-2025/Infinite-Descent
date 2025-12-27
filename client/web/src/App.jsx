import { Route,Routes,BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Header from "./component/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){
  const [isLoggedIn,setIsLoggedIn]=useState(false)

  const logout=()=>{
    setIsLoggedIn(false)
    alert("logout")
  };
  return(
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={logout}/>
      <Routes>
        <Route path="/login"element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/signup"element={<Signup/>}/>
         <Route path="/" element={<h2 style={{textAlign:"center", marginTop:"50px"}}>Home Page</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;