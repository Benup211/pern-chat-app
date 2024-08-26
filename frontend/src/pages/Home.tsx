import MessageContainer from "../components/messages/MessageContainer"
import Sidebar from "../components/sidebar/Sidebar"
const Home = () => {
  return (
    <div className="flex h-[80vh] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home