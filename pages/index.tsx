import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>VetGhat</title>
        <meta name="description" content="Developed by Ashish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className='text-gray-900 font-bold text-2xl'>This is Home Page</p>
    </div>
  )
}
