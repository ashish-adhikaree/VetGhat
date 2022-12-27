import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import { Socket } from "socket.io-client";
import { Router, useRouter } from "next/router";
import  NProgress  from "nprogress";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const isSocketPresent = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      NProgress.done(false);
    });
  }, [Router]);

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

  if (socket)
    return (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <Component socket={socket} {...pageProps} key={router.asPath} />
      </div>
    );
}
