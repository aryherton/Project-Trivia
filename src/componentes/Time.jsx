import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      interval: '',
    };
  }

  componentDidMount() {
    this.verifyStartTime();
  }

  componentDidUpdate(prevProps) {
    const currentProps = this.props;

    if (prevProps !== currentProps) {
      this.verifyStartTime();
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;

    clearInterval(interval);
  }

  verifyStartTime = () => {
    const { startTime, changeStartTime } = this.props;
    const { interval } = this.state;

    if (startTime) {
      this.setState({ time: 30 });
      clearInterval(interval);
      changeStartTime(false);
      this.setTimer();
    }
  }

  setTimer = () => {
    const TEMPO = 1000;
    const interval = setInterval(this.contador, TEMPO);

    this.setState({ interval });
  }

  contador = () => {
    const { time, interval } = this.state;
    const { disableButtons } = this.props;

    if (time === 0) {
      clearInterval(interval);
      disableButtons(true);
    } else {
      this.setState((state) => {
        const count = { time: state.time -= 1 };
        return count;
      });
    }
  }

  render() {
    const { time } = this.state;
    return (
      <span id="time" className="my-6 text-2xl sm:text-lg">{time}</span>
    );
  }
}

Time.propTypes = {
  disableButtons: PropTypes.func,
}.isRequired;

export default Time;
