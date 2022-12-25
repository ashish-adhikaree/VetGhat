import { GiCancel } from "react-icons/gi";
import { User } from "../../typedeclaration";
import UserAvatar from "../reusables/userAvatar";
import Link from "next/link";

const UserList = ({
  switchCardState,
  type,
  users,
}: {
  switchCardState: any;
  type: string;
  users: User[] | undefined;
}) => {
  window.onscroll = () => {
    window.scrollTo(0, 0);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    switchCardState(false);
    window.onscroll = () => {};
  };
  return (
    <div className="h-full w-full flex items-center justify-center fixed bottom-0 left-0 z-[200] bg-black bg-opacity-60">
      <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl space-y-6">
        <div className="relative border-b text-center font-bold text-xl py-3">
          {type.toUpperCase()}
          <button onClick={handleClose} className="absolute top-4 right-5">
            <GiCancel className="text-gray-400 hover:text-gray-700 " />
          </button>
        </div>
        <div>
          {users &&
            users.map((user, index) => (
              <div key={index} className="flex items-center m-5">
                <UserAvatar src={user.profilepic.url} />
                <Link href={`/profile/${user.id}`} className="ml-3 hover:underline font-semibold">{user.username}</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default UserList;
