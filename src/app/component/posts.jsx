import PostsList from './postsList'
import Post from './post'
// import query from 'query-string'
// import _ from 'lodash'



const Posts = ({ match, history }) => {
  const posts = [
    { id: 1, label: 'post 1' },
    { id: 2, label: 'post 2' },
    { id: 3, label: 'post 3' },
  ]
  const postId = match.params.postId
  // const search = query.parse(location.search)
  // console.log('search ========== ', search)


  return (
    <>
      { postId ?
        (
          <Post posts={ posts } 
          id={ postId } 
          history={ history }  
          />
      ) : (
      < PostsList posts={ posts } />)
      }
    </>)
}

export default Posts
