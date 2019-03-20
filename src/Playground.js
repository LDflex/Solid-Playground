import React from 'react';
import { Value, List } from '@solid/react';
import './Playground.css';

export default class Playground extends React.Component {
  state = {
    max: 20,
    multiple: true,
    ...this.updateExpression(),
  }

  componentDidUpdate({ expression }) {
    if (this.props.expression !== expression)
      this.updateExpression();
  }

  updateExpression(input) {
    const expression = input || this.props.expression || '';
    // An expression has no side effects if it has no method calls
    // (conservatively identified by a parenthesis)
    const safe = !expression.includes('(');
    const state = {
      input: expression,
      // Don't evaluate unsafe expressions unless the user asks
      expression: input || safe ? expression : '',
      // Avoid evaluating unsafe expressions a second time
      sparql: expression && safe ? `${expression}.sparql` : '',
    };
    return this.state ? this.setState(state) : state;
  }

  onChangeExpression = event => {
    this.setState({ input: event.target.value });
  }

  onChangeMultiple = event => {
    this.setState({ multiple: event.target.checked });
  }

  onExecute = event => {
    event.preventDefault();
    const { input } = this.state;
    this.updateExpression(input);
    if (this.props.onExpressionChange)
      this.props.onExpressionChange(input);
  }

  render() {
    const { input, multiple, max, expression, sparql } = this.state;
    return (
      <form className="playground" onSubmit={this.onExecute}>
        <p className="expression">
          <label><code>solid.data</code></label>
          <input value={input} onChange={this.onChangeExpression} required />
          <button>Execute</button>
        </p>
        <p className="multiple">
          <label>
            <input type="checkbox" checked={multiple} onChange={this.onChangeMultiple}/>
            multiple results
          </label>
        </p>

        <h3>Expression</h3>
        <pre className="expression"><code>{expression}</code></pre>

        { !multiple ? <div>
            <h3>Single result</h3>
            <p className="single"><Value src={expression}/></p>
          </div> : <div>
            <h3>Multiple results <em>(first {max})</em></h3>
            <List src={expression} limit={max}>{(item, i) =>
              <li key={i}>{linkTo(`${item}`)}</li>}
            </List>
          </div>
        }

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
