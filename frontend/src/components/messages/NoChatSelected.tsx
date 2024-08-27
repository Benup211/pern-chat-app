import { TiMessages } from "react-icons/ti"
import { AuthState } from "../../state/authState"

const NoChatSelected = () => {
  const {user}=AuthState();
  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>Welcome 👋 {user.fullName}</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center"/>
        </div>

    </div>
  )
}

export default NoChatSelected