import Image from "next/image";
const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Image className="rounded-full" draggable="false" alt="" src={src} width={50} height={50} />
  );
};

export default UserAvatar;
