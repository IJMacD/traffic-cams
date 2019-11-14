import React from 'react';
import './App.css';

const url = 'https://traffic.td.gov.hk/DisplayImage.do';
const cams = ['021101','021102','021103','021104','021105','021106','021107','021108','021109','021110','021111','021112'];

function App() {
  const [ code, setCode ] = React.useState("");
  useAlarm(10 * 1000);

  const date = new Date();
  const time = date.toTimeString().substr(0, 5);

  React.useEffect(() => {
    fetch("/timecode").then(r => r.text()).then(t => setCode(t));
  }, [time]);

  return (
    <div className="App">
      <div>
      {
        cams.map(id => <img key={id} src={`${url}?id=${id}&time=${code}&r=${Math.random()}`} />)
      }
      </div>
    </div>
  );
}

export default App;

function useAlarm (duration) {
  const [ _, setCounter ] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setCounter(counter => counter + 1), duration);
    return () => clearInterval(id);
  }, [duration]);
}

function useLocalStorage (key, defaultValue) {
  const saved = localStorage.getItem(key);

  if (saved) {
    try {
      defaultValue = JSON.parse(saved);
    } catch (e) {}
  }

  const [ state, setState ] = React.useState(defaultValue);

  return [ state, val => { setState(val); localStorage.setItem(key, JSON.stringify(val)); }];
}