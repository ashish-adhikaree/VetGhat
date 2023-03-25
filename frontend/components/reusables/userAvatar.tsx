import Image from "next/image";
import { loaderProp } from "../../reusables";
const UserAvatar = ({ src }: { src: string }) => {
  return (
    <div className="h-[40px] w-[40px]">
      <Image
      className="rounded-full w-full h-full object-cover "
      draggable="false"
      alt=""
      loader={loaderProp}
      src={src}
      width={50}
      height={50}
      priority = {true}
      unoptimized
    />
    </div>
    
  );
};

export default UserAvatar;
