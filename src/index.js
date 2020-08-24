import React from 'react';
import ReactDOM from 'react-dom';
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const Controls = (props) => {
  return (
    <div id="controls">Controls</div>
  );
}

const Screen = ({ text }) => {
  return (
    <div id="screen">
      <p>{text}</p>
    </div>
  );
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key.toUpperCase() === this.props.keyData.keyTrigger) {
      this.playSound(e.key.toUpperCase());
    }
  }

  handleClick(e) {
    this.playSound(document.getElementById(e.target.id).firstChild.id);
  }

  activatePad() {
    const activeStyle = {
      boxShadow: "inset -3px -7px 5px #FAFAFA, inset 5px 5px 7px rgba(0, 0, 0, 0.1)"
    };

    if(!this.state.style){
      this.setState({
        style: activeStyle
      });
    }else{
      this.setState({
        style: null
      });
    }
    
  }

  playSound = (id) => {
    const sound = document.getElementById(id);
    this.activatePad();
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(sound.parentElement.id);
  }

  render() {
    let { keyCode, id, keyTrigger, url } = this.props.keyData;

    return (
      <button
        id={id}
        className="drum-pad"
        key={keyCode}
        onClick={(e) => this.handleClick(e)}
        style={this.state.style}>
        <audio id={keyTrigger} src={url} className="clip" />
        {keyTrigger}
      </button>
    );
  }
}

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="keyboard">
        {
          bankOne.map(key => <DrumPad keyData={key} updateDisplay={this.props.updateDisplay} />)
        }
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyTrigger: null,
      display: 'choose your bit'
    }

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(text) {
    this.setState({
      display: text
    })
  }

  render() {
    return (
      <div id="display" className="drum-machine-display">
        <Screen text={this.state.display} />
        <Keyboard updateDisplay={this.updateDisplay} />
      </div>
    );
  };
};



ReactDOM.render(<App />, document.getElementById("drum-machine"));
