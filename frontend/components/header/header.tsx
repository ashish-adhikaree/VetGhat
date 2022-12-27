import Link from "next/link";
import ProfileSection from "./profileSection";

const Header = () => {

  return (
    <div className="w-full bg-white p-5 sticky top-0 shadow-sm flex items-center justify-between z-[200]">
      <Link href="/">Logo</Link>
      <div>SearchBox</div>
      <div>
        <ProfileSection/>
      </div>
    </div>
  );
};
export default Header;
