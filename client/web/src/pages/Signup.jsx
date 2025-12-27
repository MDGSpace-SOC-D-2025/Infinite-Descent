import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [form,setForm]=useState({username:"",email:"",password:""})
    const navigate=useNavigate();

    const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value});
    const handleSigup=async(e)=>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/api/users/register",form);
            alert("signup success");
            navigate("/login");
            
        } catch (err) {
            alert(err.responser?.data?.message||"fail");
            
        }
    }
    return(
        <form onSubmit={handleSigup}>
            <h2>signin</h2>
            <input name="username" placeholder="username" onChange={handleChange}/>
            <input name="email" placeholder="email" onChange={handleChange} />
            <input name="password" placeholder="password" onChange={handleChange}/>
            <button type="submit">signin</button>
        </form>
    )
}

export default Signup