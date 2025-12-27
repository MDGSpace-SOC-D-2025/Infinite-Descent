import {Link} from "react-router-dom"

function Header({isLoggedIn,onLogout}){
    return(
        <header >
            <nav>
                {!isLoggedIn?(
                    <>
                    <Link to="/login">login</Link>
                    <Link to="/signup">signin</Link>
                    </>
                ):(
                    <button onClick={onLogout}>LOGOUT</button>
                )}
            </nav>
        </header>
    )
}

export default Header