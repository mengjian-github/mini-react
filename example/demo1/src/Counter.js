import { Component } from "../../../react";

export default class Counter extends Component {
  state = {
    count: 0,
  };

  componentWillMount() {
    console.log("componentWillMount触发");
  }

  componentDidMount() {
    console.log("componentDidMount触发");
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate触发", nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate触发", prevProps, prevState);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps触发", nextProps);
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me! Number of clicks: {this.state.count}
      </button>
    );
  }
}
