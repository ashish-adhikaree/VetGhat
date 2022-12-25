import Link from "next/link"
import { Comment } from "../../typedeclaration"
import UserAvatar from "../reusables/userAvatar"

const Comment = ({cmnt}:{cmnt: Comment}) => {
    return <div className="flex-grow p-5 pl-10 items-center">
    <div className=" flex space-x-3 items-center">
      <UserAvatar src={cmnt.author.profilepic.url}/>
      <div>
      <Link as={`/profile/${cmnt.author.id}`} href={`/profile/${cmnt.author.id}`} className="font-semibold mr-2 hover:underline">{cmnt.author.username}</Link>
    <span className="text-gray-600">{cmnt.body}</span>
    <p className="text-gray-500">{cmnt.postedAt}</p>
        </div>
      </div>
  </div>
}

export default Comment