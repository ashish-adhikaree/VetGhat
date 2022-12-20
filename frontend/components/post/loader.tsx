import Layout from "../Layout/layout";

const Loader = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mt-5 space-y-5">
        <div className="bg-gray-300 animate-pulse w-2/3 md:w-1/2 lg:w-1/3 p-3 rounded-md h-[60px]"></div>
        <div className="bg-gray-300 animate-pulse w-2/3 md:w-1/2 lg:w-1/3 p-3 rounded-md h-[400px]"></div>
        <div className="bg-gray-300 animate-pulse w-2/3 md:w-1/2 lg:w-1/3 p-3 rounded-md h-[400px]"></div>
      </div>
    </Layout>
  );
};

export default Loader;
