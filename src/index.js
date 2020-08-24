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
  return(
    <div id="controls">Controls</div>
  );
}

const Screen = ({text}) => {
  return (
    <div id="screen">
      <p>{text}</p>
    </div>
  );
};

class DrumPad extends React.Component{
  constructor(props){
    super(props); 
    
  }  
  
  render(){
    let {keyCode, id, keyTrigger, url} = this.props.keyData;      
    let {className, handleClick} = this.props;
    return (
      <button 
        id={id} 
        className={className} 
        onClick={()=>handleClick(id, keyTrigger)}>
          <audio id={keyTrigger} src={url} className="clip"/>
        {keyTrigger}
      </button>
    );
  }
}

class Keyboard extends React.Component {
  constructor(props){
    super(props);    
  } 
  
  render(){
    return (
      <div id="keyboard">
        {bankOne.map(key => <DrumPad 
                              key={key.keyTrigger}
                              className = {this.props.keyTrigger === key.id ? "drum-pad active" : "drum-pad"}
                              keyData={key} 
                              handleClick={this.props.handleClick} 
                            />
                    )}          
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props){
    super(props); 

    this.state={
        keyTrigger: null,
        display: 'choose your bit'
    }  

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick=this.handleClick.bind(this);   
  }   

  componentDidMount(){
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount(){
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress(e){    
    if(document.getElementById(e.key.toUpperCase())){
      let id=document.getElementById(e.key.toUpperCase()).parentNode.id;
      let keyTrigger = e.key.toUpperCase();
      this.handleClick(id, keyTrigger);
    }
  }

  handleClick(id, keyTrigger){          
      this.setState({
          keyTrigger: id,
          display: id
      });        
      this.playSound(keyTrigger); 
      setTimeout(() => this.setState({keyTrigger: null}), 100);
  }  
   
   playSound(key){      
    const sound = document.getElementById(key);
    if(sound){
      sound.currentTime=0;
      sound.play(); 
    } else return;       
  } 

  render(){
    return (
      <div id="display" className="drum-machine-display">
        <Screen text={this.state.display}/>
        <Keyboard handleClick={this.handleClick} keyTrigger={this.state.keyTrigger}/>
      </div>
    );
  };
};



ReactDOM.render(<App />, document.getElementById("drum-machine"));
  