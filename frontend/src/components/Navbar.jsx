
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
function Navbar(){
    const navigate=useNavigate() 
    function handleLogoOut(){
        console.log("btn clicked")
       navigate("/login")
    }

    const {pathname}=useLocation()
    console.log(pathname==="/landing")
    return(
        <div className="absolute z-10 top-0 w-full flex justify-between items-center px-5 h-16">
            <img src={logo} alt="netflix-logo" className="w-36 xs:w-40"/>
            {pathname==="/landing"?<button onClick={handleLogoOut} className="bg-red-600 py-1.5 xs:py-2.5 px-3 xs:px-4 text-gray-50 rounded-md">Log out</button>:""}
    </div>
    )
}
export default Navbar