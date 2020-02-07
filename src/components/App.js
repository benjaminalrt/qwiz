import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import axios from "axios";

import '../styles/App.css';
// import Quiz from './Quiz/Quiz';
import QuizForm from './Quiz/QuizForm';
import Header from './pages/fragments/Header.js'
import Footer from './pages/fragments/Footer.js'

const App = () => {

  const specialCategories = [ {'id':200, 'name':'Each category'},{'id':100, 'name':'Any category'}]

  useEffect(() => {
    const url = "https://opentdb.com/api_category.php";
    axios.get(url).then(response => {
        let array = response.data.trivia_categories
        array.sort((a,b)=>{
            if(a.name<b.name) return -1
            else return 1;
        })
        array = array.concat(specialCategories)
        localStorage.setItem('categories', JSON.stringify(array))
      })
}, []);

  return (
  <>
    <Header/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/play" component={QuizForm} />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
      </Switch>
    <Footer/>
  </>
  );
}

export default App;
