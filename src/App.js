// import logo from "./logo.svg";
import "./App.css";
import Apicall from "./components/Apicall";
import { useState } from "react";

const primes = "http://20.244.56.144/numbers/primes";
const fibo = "http://20.244.56.144/numbers/fibo";
const odd = "http://20.244.56.144/numbers/odd";
const rand = "http://20.244.56.144/numbers/rand";

function App() {
  const [input, setInput] = useState("");
  const changeHandler = (event) => {
    setInput(event.target.value);
  };
  const submitHanlder = (event) => {
    event.preventDefault();
    console.log(input);
    setInput('');
  };
  return (
    <div className="App">
      <form onSubmit={submitHanlder}>
        <input
          type="text"
          placeholder="Enter Url"
          onChange={changeHandler}
          value={input}
          size='100'
        ></input>
        <button type="submit">Submit</button>
      </form>
      <Apicall primes={primes} fibo={fibo} odd={odd} rand={rand} input={input}/>
    </div>
  );
}

export default App;
