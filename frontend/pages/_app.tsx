import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import { Socket } from "socket.io-client";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const isSocketPresent = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter()
  useEffect(() => {
    if (!isSocketPresent.current) {
      const jwt = cookieCutter.get("jwt");

      const { io } = require("socket.io-client");

      // token will be verified, connection will be rejected if not a valid JWT
      const temp = io(process.env.STRAPI_URL, {
        auth: {
          token: jwt,
        },
      });
      setSocket(temp);

      temp.on("connect", () => {
        console.log("connected");
      });
      return () => {
        isSocketPresent.current = true;
      };
    }
  }, []);
  
  if (socket) return <Component socket={socket} {...pageProps}  key={router.asPath}/>;
}
