import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filtered, setFiltered] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])//[persons]


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
      personService.create(person)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewPhone('')
        })
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

  const handleDeleteContact = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id).then(
          setPersons(persons.filter(p => p.id !== id))
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Contacts persons={persons} deleteContact={handleDeleteContact} filteredPersons={filteredPersons} filtered={filtered} />
    </div>
  )
}

export default App
