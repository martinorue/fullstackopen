import { useState } from 'react'

// const Header = ({ name }) => {
//   return (
//     <>
//       <h1>{name}</h1>
//     </>
//   )
// }


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName
    }

    const exist = persons.filter(p => p.name === newName);
    if (exist.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p, i) => <li key={i}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App
