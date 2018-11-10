import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Playground from './Playground';
import './App.css';

const defaultExpression = "['https://ruben.verborgh.org/profile/#me'].friends.firstName";

class App extends React.Component {
  // Save the state in the URL fragment
  get savedState() {
    return { expression: window.location.hash.substr(1) };
  }
  set savedState({ expression }) {
    window.location.replace(`#${expression}`);
  }

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
        <Playground expression={this.savedState.expression || defaultExpression}
                    onExpressionChange={e => this.savedState = { expression: e }}/>
      </main>
      <Footer/>
    </div>
    );
  }
}
export default App;
