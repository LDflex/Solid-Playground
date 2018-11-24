import React from 'react';
import { Value, List } from '@solid/react';
import './Playground.css';

export default class Playground extends React.Component {
  state = this.updateExpression();

  componentDidUpdate({ expression }) {
    if (this.props.expression !== expression)
      this.updateExpression();
  }

  updateExpression() {
    const expression = this.props.expression || '';
    const state = {
      input: expression,
      expression: this.isSafe(expression) ? expression : '',
    };
    return this.state ? this.setState(state) : state;
  }

  isSafe(expression) {
    // An expression is assumed to have no side-effects
    // when it does not contain method calls,
    // which we conservatively identify by a parenthesis
    return !expression.includes('(');
  }

  onChangeInput = event => {
    this.setState({ input: event.target.value });
  }

  onSubmitInput = event => {
    event.preventDefault();
    const { input } = this.state;
    this.setState({ expression: input });
    if (this.props.onExpressionChange)
      this.props.onExpressionChange(input);
  }

  render() {
    const { input, expression } = this.state;
    return (
      <form className="playground" onSubmit={this.onSubmitInput}>
        <p className="expression">
          <label><code>solid.data</code></label>
          <input value={input} onChange={this.onChangeInput} required />
          <button>Execute</button>
        </p>
        <h3>Single result</h3>
        <p className="single"><Value src={expression}/></p>
        <h3>Multiple results (first 10)</h3>
        <List src={expression} limit="10"/>
        <h3>Corresponding SPARQL query</h3>
        <pre className="sparql"><code>
          <Value src={expression && `${expression}.sparql`}/>
        </code></pre>
      </form>
    );
  }
}
