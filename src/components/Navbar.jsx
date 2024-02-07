import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../images/log.png"

function Navbar() {
    const{isAuthenticated,logout,user}=useAuth()
    return (
    <nav className="flex justify-between items-center px-4 py-2 bg-gradient-to-tr from-black  to-purple-700">
       
      <div className="flex">
      <div className="w-60 m-auto ">
          <img className="h-12 rounded-xl w-full"  src={logo}/>
        </div>
       <div className="px-5 m-auto ">
       <Link to= "/" className="text-white" >
          <h1 className="text-2xl"  onClick={()=>{
            logout()
          }} >Tasks Manager</h1>
        </Link>
       </div>
      </div>
      <ul className="flex  space-x-4 text-xl">
       {
        isAuthenticated ?(<>
         <li className="text-white text-2xl m-auto">
            Welcome {user.username}
        </li>
        <li className="m-auto">
          <Link className="px-4  bg-yellow-500 rounded" to="/add-task">
            Add Task
          </Link>
        </li>
          <li className="m-auto">
          <Link className="px-4  bg-yellow-500 rounded" to="/login"  onClick={()=>{
            logout()
          }}>
            Logout
          </Link>
        </li>
        </>):(<>
            <li className="m-auto">
          <Link className="px-4  bg-gradient-to-tr text-white from-purple-500 rounded-2xl to-black" to="/login">
            Login
          </Link>
        </li>
        <li className="m-auto">
          <Link className="px-4  bg-gradient-to-tr from-purple-500 text-white rounded-2xl to-blackrounded" to="/">
            Home
          </Link>
        </li>
        </>)
       }
      </ul>
    </nav>
  );
}

export default Navbar;
