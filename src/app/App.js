import Navbar from './component/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './component/dashboard'
import Home from './component/home'
import Login from './component/login'
import Posts from './component/posts'
// import PostsList from './component/postsList'
// import Post from './component/post'
// import Stats from './component/stats'
import NotFound from './component/not-found'

function App() {
  return (
    <div>
      <Navbar />
      <h1>App</h1>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/dashboard/stats" component={Stats} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route
          path="/posts/:postId?"
          component={Posts}
          // render={(props) => <Posts {...props} />}
        />
        <Route path="/404" component={NotFound} />
        <Redirect from="/admin" to="/dashboard" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default App
