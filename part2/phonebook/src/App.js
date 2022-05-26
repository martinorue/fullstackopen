import { useState } from 'react'
import PersonForm from './components/AddPerson'
import Persons from './components/Contacts'
import Filter from './components/Filter'

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
      number: newPhone,
      id: persons.length + 1
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

  const handleNameChange = (event) => {
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} filtered={filtered} />
    </div>
  )
}

export default App
