import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { User } from "../../typedeclaration";
import UserAvatar from "../reusables/userAvatar";

const HeartCard = ({
  hearts,
  uid,
  showHeartCard,
}: {
  hearts: User[];
  uid: string,
  showHeartCard: any;
}) => {
  return (
    <div className="h-full w-full overflow-y-scroll scrollbar-none absolute top-0 bottom-0 left-0 right-0 bg-white z-[100]">
      <div className="sticky top-0 bg-white w-full border-b text-center p-3 font-semibold flex items-center">
        <BiArrowBack
          className="text-xl cursor-pointer"
          onClick={() => {
            showHeartCard(false);
          }}
        />
        <p className="flex-grow">Hearts</p>
      </div>
      {hearts.map((user, index) => (
        <div key={index} className={`${index%2 === 0 ? "bg-gray-100" : ""} p-5 px-10 flex space-x-3 items-center`}>
          <UserAvatar src={user.profilepic.url} />
          <Link
            href={`/profile/${user.id}`}
            className="font-semibold mr-2 hover:underline"
          >
            {user.id.toString() === uid ? "You" : user.username}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default HeartCard;
