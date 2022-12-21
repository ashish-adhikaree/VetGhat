import Image from "next/image";
const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Image
      className="rounded-full"
      draggable="false"
      alt=""
      src={process.env.STRAPI_URL+ src}
      width={50}
      height={50}
      priority = {true}
    />
  );
};

export default UserAvatar;
