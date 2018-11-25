import React from 'react';
import { Value, List } from '@solid/react';
import { evaluate, isSafe } from './expressions';
import './Playground.css';

export default class Playground extends React.Component {
  state = this.updateExpression();

  componentDidUpdate({ expression }) {
    if (this.props.expression !== expression)
      this.updateExpression();
  }

  updateExpression(input) {
    const expression = input || this.props.expression || '';
    const safe = isSafe(expression);
    const state = {
      input: expression,
      // Don't evaluate unsafe expressions unless the user asks
      expression: input || safe ? expression : '',
      evaluation: input || safe ? evaluate(expression) : '',
      // Avoid evaluating unsafe expressions a second time
      sparql: expression && safe ? `${expression}.sparql` : '',
    };
    return this.state ? this.setState(state) : state;
  }

  onChangeInput = event => {
    this.setState({ input: event.target.value });
  }

  onSubmitInput = event => {
    event.preventDefault();
    const { input } = this.state;
    this.updateExpression(input);
    if (this.props.onExpressionChange)
      this.props.onExpressionChange(input);
  }

  render() {
    const { input, expression, evaluation, sparql } = this.state;
    return (
      <form className="playground" onSubmit={this.onSubmitInput}>
        <p className="expression">
          <label><code>solid.data</code></label>
          <input value={input} onChange={this.onChangeInput} required />
          <button>Execute</button>
        </p>
        <h3>Expression</h3>
        <pre className="expression"><code>{expression}</code></pre>

        <h3>Single result</h3>
        <p className="single"><Value src={evaluation}/></p>

        <h3>Multiple results (first 10)</h3>
        <List src={evaluation} limit="10">{(item, i) =>
          <li key={i}>{linkTo(`${item}`)}</li>}
        </List>

        <h3>Corresponding SPARQL query</h3>
        <pre className="sparql"><code><Value src={sparql}/></code></pre>
      </form>
    );
  }
}

function linkTo(dest) {
  return !/^https?:/.test(dest) ? dest :
    <a href={dest} target="_blank" rel="noopener noreferrer">{dest}</a>;
}
