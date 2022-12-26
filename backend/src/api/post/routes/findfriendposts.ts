export default {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/findfriendsposts',
        handler: 'post.findFriendsPosts',
      }
    ]
  }