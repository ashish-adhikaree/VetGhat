import Link from "next/link";
import ProfileSection from "./profileSection";
import SearchBar from "./searchBar";
import Image from "next/image"

const Header = () => {

  return (
    <div className="w-full bg-white p-5 sticky top-0 shadow-sm flex items-center justify-between z-[200]">
      <Link href="/" className="h-[40px] w-[50px]">
        <Image className= "h-full w-full object-contain" src="/vetghatlogo.png" alt="vetghat logo" width={400} height={400} priority={true}/>
      </Link>
      <SearchBar/>
      <div>
        <ProfileSection/>
      </div>
    </div>
  );
};
export default Header;
