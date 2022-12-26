import { GiCancel } from "react-icons/gi";
import { User } from "../../typedeclaration";
import UserAvatar from "../reusables/userAvatar";
import { useRouter } from "next/router";
import { GetServerSideProps, GetStaticProps } from "next";

const UserList = ({
  switchCardState,
  type,
  users,
}: {
  switchCardState: any;
  type: string;
  users: User[] | undefined;
}) => {
  const router = useRouter();

  window.onscroll = () => {
    window.scrollTo(0, 0);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    switchCardState(false);
    window.onscroll = () => {};
  };
  const handleUserClick = (e: any, user: User) => {
    handleClose(e);
    router.replace(`/profile/${user.id}`);
  };

  return (
    <div className="h-full w-full flex items-center justify-center fixed bottom-0 left-0 z-[200] bg-black bg-opacity-60">
      <div className="w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl">
        <div className="relative border-b text-center font-bold text-xl py-3">
          {type.toUpperCase()}
          <button onClick={handleClose} className="absolute top-4 right-5">
            <GiCancel className="text-gray-400 hover:text-gray-700 " />
          </button>
        </div>
        <div className="h-[400px] overflow-scroll scrollbar-none">
          {users ? (
            users.map((user, index) => (
              <div key={index} className="flex items-center m-5">
                <UserAvatar src={user.profilepic.url} />
                <div
                  onClick={(e) => {
                    handleUserClick(e, user);
                  }}
                  className="ml-3 hover:underline font-semibold cursor-pointer"
                >
                  {user.username}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center text-center text-gray-500">
              No followers
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserList;
