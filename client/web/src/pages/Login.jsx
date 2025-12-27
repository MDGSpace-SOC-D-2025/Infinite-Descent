import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({setIsLoggedIn}){
    const [form,setForm]=useState({email:"",password:""});
    const navigate=useNavigate();

    const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value});

    const handleDefault=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:3001/api/users/login",form,{withCredentials:true});
            setIsLoggedIn(ture);
            navigate("/")
        }catch(err){
            alert(err.response?.data?.message||"login nahi hua");
        }
    }
    return(
        <form onSubmit={handleLogin}>
            <h2>login</h2>
            <input name="email" placeholder="email" onChange={handleChange}/>
            <input name="password" placeholder="password" onChange={handleChange}/>
            <button type="sumbit">login</button>
            </form>
    );
        
}
export default Login