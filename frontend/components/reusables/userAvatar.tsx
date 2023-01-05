import Image from "next/image";
const UserAvatar = ({ src }: { src: string }) => {
  return (
    <div className="h-[40px] w-[40px]">
      <Image
      className="rounded-full w-full h-full object-cover "
      draggable="false"
      alt=""
      src={src}
      width={50}
      height={50}
      priority = {true}
    />
    </div>
    
  );
};

export default UserAvatar;
