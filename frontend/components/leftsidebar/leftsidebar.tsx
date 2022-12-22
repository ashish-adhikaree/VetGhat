import { UserDetails } from "../../typedeclaration"
import ProfileCard from "./profileCard"

const LeftSidebar = ({user}:{user:UserDetails}) => {
    return <div className="bg-white h-full w-80 hidden lg:flex flex-col pt-20 fixed  bottom-0 left-0 ">
        <ProfileCard user={user}/>
    </div>
}

export default LeftSidebar