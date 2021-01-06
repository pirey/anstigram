import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import AlbumPage from 'pages/AlbumPage'
import PhotoPage from 'pages/PhotoPage'
import UserPage from 'pages/UserPage'
import FavoritePhotosPage from 'pages/FavoritePhotosPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/photos/:photoId" exact component={PhotoPage} />
        <Route path="/albums/:albumId" exact component={AlbumPage} />
        <Route path="/users/:userId" exact component={UserPage} />
        <Route path="/favorites" exact component={FavoritePhotosPage} />
        <Route path="/" exact component={MainPage} />
      </Switch>
    </Router>
  )
}

export default App
