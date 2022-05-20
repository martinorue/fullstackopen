const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
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
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Header name="Web development curriculum" />
      {courses.map(c => <Course key={c.id} course={c} />)}
    </>
  )
}
export default App