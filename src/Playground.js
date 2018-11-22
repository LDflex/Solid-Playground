import React from 'react';
import { Value, List } from '@solid/react';
import './Playground.css';

export default class Playground extends React.Component {
  state = { expression: this.props.expression };

  componentDidUpdate({ expression }) {
    if (this.props.expression !== expression)
      this.setState({ expression: this.props.expression });
  }

  onExpressionChanged({ target: { value: expression } }) {
    this.setState({ expression });
    if (this.props.onExpressionChange)
      this.props.onExpressionChange(expression);
  }

  render() {
    const { expression } = this.state;
    return (
      <div className="playground">
        <p className="expression">
          <label><code>solid.data</code></label>
          <input value={expression}
                 onChange={e => this.onExpressionChanged(e)}/>
        </p>
        <h3>Single result</h3>
        <p className="single"><Value src={expression}/></p>
        <h3>Multiple results (first 10)</h3>
        <List src={expression} limit="10"/>
        <h3>Corresponding SPARQL query</h3>
        <pre className="sparql"><code>
          <Value src={expression && `${expression}.sparql`}/>
        </code></pre>
      </div>
    );
  }
}
