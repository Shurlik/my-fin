import NumericInput from "./components/NumericInput"
import './App.css';

function App() {
  return (
    <div className="App">
    <NumericInput
        min={0}
        max={100}
        initialValue={0}
        step={5}
        digits={0}
    />
    </div>
  );
}

export default App;
