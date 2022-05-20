const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  const { parts } = { ...course }
  return (
    <>
      <Part parts={parts} />
    </>
  )
}

const Part = ({ parts }) => {
  return (
    <>
      {parts.map(p => <p key={p.id}>{p.name} {p.exercises}</p>)}
    </>
  )
}

const Total = ({ parts }) => {

  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}
export default App