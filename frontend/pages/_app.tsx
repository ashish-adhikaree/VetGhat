import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const isSocketPresent = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      NProgress.done(false);
    });
  }, [Router]);

  const connectSocket = async () => {
    try {
      const { data } = await axios.get("/api/auth/verifytoken");
      const { io } = require("socket.io-client");
      // token will be verified, connection will be rejected if not a valid JWT
      const temp = io(process.env.STRAPI_URL, {
        auth: {
          token: data.jwt,
        },
      });
      setSocket(temp);
      temp.on("connect", () => {
        console.log("connected");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isSocketPresent.current) {
      connectSocket();
      return () => {
        isSocketPresent.current = true;
        socket?.disconnect();
      };
    }
  }, []);

  if (socket)
    return (
      <div>
        <Head>
          <title>VetGhat</title>
          <meta name="description" content="Developed by Ashish" />
          <link rel="icon" href="/vetghatlogo.png" />
        </Head>
        <Component socket={socket} {...pageProps} key={router.asPath} />
      </div>
    );
}
