import Head from 'next/head'
import CreatePostCardMini from '../components/post/createPostCardMini'
import Post from '../components/post/post'

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen space-y-5'>
      <Head>
        <title>VetGhat</title>
        <meta name="description" content="Developed by Ashish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreatePostCardMini/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>

    </div>
  )
}
