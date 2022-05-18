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

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.number}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.msj === '') {
    return (
      <table>
        <tbody>
          <StatisticLine text={props.line[0].name} number={props.line[0].value} />
          <StatisticLine text={props.line[1].name} number={props.line[1].value} />
          <StatisticLine text={props.line[2].name} number={props.line[2].value} />
          <StatisticLine text={props.line[3].name} number={props.line[3].value} />
          <StatisticLine text={props.line[4].name} number={props.line[4].value} />
          <StatisticLine text={props.line[5].name} number={props.line[5].value + ' %'} />
        </tbody>
      </table>
    )
  }
}

const Msj = (props) => {
  return (
    <>
      <p>{props.text}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [msj, setMsj] = useState('No feedback given')

  const setToGood = newValue => setGood(newValue);
  const setToNeutral = newValue => setNeutral(newValue);
  const setToBad = newValue => setBad(newValue);
  const setToMsj = newValue => setMsj(newValue);

  const total = good + bad + neutral;
  const average = total > 0 ? (good - bad) / total : 0;
  const positives = total > 0 ? good / total * 100 : 0;

  const feedback = {
    sentiments: [
      {
        name: 'good',
        value: good
      },
      {
        name: 'neutral',
        value: neutral
      },
      {
        name: 'bad',
        value: bad
      },
      {
        name: 'all',
        value: total
      },
      {
        name: 'average',
        value: average
      },
      {
        name: 'positive',
        value: positives
      }
    ]
  }
  return (
    <>
      <Header header={"give feedback"} />

      <Button handleClick={() => {
        setToGood(good + 1)
        setToMsj('')
      }} text="good" />

      <Button handleClick={() => {
        setToNeutral(neutral + 1)
        setToMsj('')
      }} text="neutral" />

      <Button handleClick={() => {
        setToBad(bad + 1)
        setToMsj('')
      }} text="bad" />

      <Header header={"statistics"} />
      <Statistics line={feedback.sentiments} msj={msj} />
      <Msj text={msj} />
    </>
  )
}

export default App