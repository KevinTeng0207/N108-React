import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './containers/App'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import rootSaga from './sagas'

// import './styles/RWD.styl'
import './styles/Main.styl'
import './styles/Login.styl'
import './styles/AppBar.styl'
import './styles/Footer.styl'
import './styles/Home.styl'
import './styles/Wrapper_Sidebar.styl'
import './styles/Note.styl'
import './styles/YT_Container.styl'
import './styles/Learn_List.styl'
import './styles/Learn_Grid.styl'
import './styles/Video.styl'
import './styles/Note_Help.styl'
import './styles/Member.styl'
import './styles/CropImg'
import './styles/Exam'
import './styles/Anime'

import './styles/githubstyle/github-markdown.styl'
import './styles/githubstyle/git-cropimg'
import './styles/githubstyle/git-calendar'

const store = configureStore()
store.runSaga(rootSaga)
render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
    , document.getElementById('root'));
