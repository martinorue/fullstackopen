import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
    </div>
  )
}

const Points = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const nextAnecdote = (newValue) => setSelected(newValue);

  const setToPoints = () => {
    const copyPoints = [...points];
    const newValue = copyPoints[selected] + 1;
    copyPoints[selected] = newValue;
    setPoints(copyPoints);
  };

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} />
      <Points text={`has ${points[selected]} votes`} />
      <Button handleClick={() => {
        setToPoints()
      }} text="vote" />
      <Button handleClick={() => {
        nextAnecdote(getRandomInt(0, 7))
      }} text="next anecdote" />
    </>
  )
}

export default App