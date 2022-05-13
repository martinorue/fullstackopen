import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  )
}

const Stats = (props) => {
  return (
    <div>
      {props.text} {props.sentiment}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => setGood(newValue);
  const setToNeutral = newValue => setNeutral(newValue);
  const setToBad = newValue => setBad(newValue);

  return (
    <>
      <Header header={"give feedback"} />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Header header={"statistics"} />
      <Stats text="good" sentiment={good} />
      <Stats text="neutral" sentiment={neutral} />
      <Stats text="bad" sentiment={bad} />
    </>
  )
}

export default App