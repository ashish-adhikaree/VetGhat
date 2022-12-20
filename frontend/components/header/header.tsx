import Link from "next/link";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";

const Header = () => {
  const [uid, setuid] = useState();
  useEffect(() => {
    setuid(cookieCutter.get("uid"));
  }, []);
  return (
    <div className="w-full bg-white p-5 sticky top-0 shadow-sm flex items-center justify-between z-[100]">
      <Link href="/">Logo</Link>
      <div>SearchBox</div>
      <div>
        <Link href={`/profile/${uid}`}>Profile</Link>
      </div>
    </div>
  );
};
export default Header;
