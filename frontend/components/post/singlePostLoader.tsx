import Head from "next/head";
import Layout from "../Layout/layout";

const SinglePostLoader = () => {
  return (
    <Layout>
      <div className="h-[80vh] flex flex-col md:flex-row bg-white m-5 space-x-5 ">
        <Head>
          <title>Post-VetGhat</title>
          <meta name="description" content="Developed by Ashish" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="overflow-hidden h-full w-1/2 bg-gray-300"></div>
        <div className="flex-grow relative">
          <div className="p-5 space-y-5">
            <div className="flex items-center space-x-5 flex-grow p-3 border-b">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div className="w-40 h-10 bg-gray-300"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-3 m-5 pt-5 h-10 bg-gray-300"></div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePostLoader;
