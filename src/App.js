import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Playground from './Playground';
import { withWebId } from '@solid/react';
import './App.css';

const defaultExpression = "['https://ruben.verborgh.org/profile/#me'].friends.firstName";

class App extends React.Component {
  state = this.savedState;

  // Save the state in the URL fragment
  get savedState() {
    return { expression: decodeURIComponent(window.location.hash.substr(1)) };
  }
  set savedState({ expression }) {
    window.location.replace(`#${encodeURIComponent(expression)}`);
  }

  componentDidUpdate(prevProps) {
    // If the user just logged in, show an example with their WebID
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId && !this.savedState.expression)
      this.setState({ expression: `[${webId}].name` });
  }

  onExpressionChange = expression => {
    this.savedState = { expression };
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
        <Playground expression={this.state.expression || defaultExpression}
                    onExpressionChange={this.onExpressionChange}/>
      </main>
      <Footer/>
    </div>
    );
  }
}
export default withWebId(App);
