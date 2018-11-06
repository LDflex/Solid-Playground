import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Playground from './Playground';
import './App.css';

const defaultExpression = "['https://ruben.verborgh.org/profile/#me'].friends.firstName";

class App extends React.Component {
  render() {
    return (
    <div>
      <Header/>
      <main>
        <h2>
          Write your 
          <a href="https://solid.github.io/query-ldflex/">
            Solid LDflex</a> expression
        </h2>
        <Playground expression={defaultExpression}/>
      </main>
      <Footer/>
    </div>
    );
  }
}
export default App;
