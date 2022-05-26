import { useState } from 'react'

const Contacts = ({ persons, filteredPersons, filtered }) => {
  return (
    <ul>
      {filtered === '' ?
        persons.map(p =>
          <Person key={p.id} name={p.name} phone={p.phone} />)
        : filteredPersons.map(p =>
          <Person key={p.id} name={p.name} phone={p.phone} />)}
    </ul>
  )
}

const Person = ({ name, phone }) => {
  return (
    <li>
      {name} {phone}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filtered, setFiltered] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      phone: newPhone
    }
    const exist = persons.filter(p => p.name === newName);
    if (exist.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
    const regex = new RegExp(filtered, 'i');
    const filteredPersons = persons.filter(person => person.name.match(regex));
    setFilteredPersons(filteredPersons);
    console.log(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={filtered}
          onChange={handleFilterChange}
        >
        </input>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNoteChange}
          />
          <div>number:
            <input
              value={newPhone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} filteredPersons={filteredPersons} filtered={filtered} />
    </div>
  )
}

export default App
