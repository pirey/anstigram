import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import AlbumPage from 'pages/AlbumPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/albums/:albumId" exact component={AlbumPage} />
        <Route path="/" exact component={MainPage} />
      </Switch>
    </Router>
  )
}

export default App
