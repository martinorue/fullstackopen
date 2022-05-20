const Course = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            <Content course={course} />
            <Total parts={course.parts} />
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
            <p><strong>total of {total} exercises</strong></p>
        </>
    )
}

export default Course
