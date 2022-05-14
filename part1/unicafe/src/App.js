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

const Statistics = (props) => {
  return (
    <div>
      {props.text} {props.number}
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

  const total = good + bad + neutral;
  const average = total > 0 ? (good - bad) / total : 0;
  const positives = total > 0 ? good / total * 100 : 0;

  return (
    <>
      <Header header={"give feedback"} />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Header header={"statistics"} />
      <Statistics text="good" number={good} />
      <Statistics text="neutral" number={neutral} />
      <Statistics text="bad" number={bad} />
      <Statistics text="all" number={total} />
      <Statistics text="average" number={average} />
      <Statistics text="positive" number={positives} />
    </>
  )
}

export default App