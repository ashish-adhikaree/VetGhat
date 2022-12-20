import Head from "next/head";
import Layout from "../Layout/layout";

const Loader = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center space-y-20 mb-[100px]">
        <Head>
          <title>Profile-VetGhat</title>
          <meta name="description" content="Developed by Ashish" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full h-[200px] flex md:space-x-10 space-x-5 mt-10 items-center justify-center">
          <div className="h-[150px] w-[150px] rounded-full animate-pulse bg-gray-300"></div>
          <div className="h-[200px] w-[300px] rounded-md animate-pulse bg-gray-300"></div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-[275px] w-[250px] bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    </Layout>
  );
};
export default Loader;
