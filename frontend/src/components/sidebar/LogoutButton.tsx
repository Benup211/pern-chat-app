import { BiLogOut } from "react-icons/bi"
import { AuthState } from "../../state/authState"
import {toast} from 'react-hot-toast';

const LogoutButton = () => {
  const {logoutUser}=AuthState();
  const handleLogout=async()=>{
    try{
      await logoutUser();
      toast.success("Sucessfully logout");
    }catch(error){
      toast.error("Error Loging out")
    }
  
  }
  return (
    <div className="mt-auto">
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout}/>
    </div>
  )
}

export default LogoutButton 