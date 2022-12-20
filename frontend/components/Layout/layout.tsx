import { PropsWithChildren } from "react";
import Header from "../header/header";

const Layout = ({children}: PropsWithChildren) => {
    return <div>
        <Header/>
        {children}
    </div>
}
export default Layout