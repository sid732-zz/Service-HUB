import './App.css';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <Header/>
          <Main/>
          <Footer/>
        </Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
