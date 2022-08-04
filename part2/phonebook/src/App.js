import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filtered, setFiltered] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [Message, setMessage] = useState(null)
  const [msjType, setMsjType] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])//[persons] --> ¿¿otra forma de que actualice persons sin necesidad de setPersons(persons.filter(p => p.id !== id))??


  const addPerson = (event) => {
    event.preventDefault()
    
    const new_person = {
      name: newName,
      number: newPhone,
    }
    personService
    .create(new_person)
      .then(createdPerson => {
        setNewName('')
        setNewPhone('')
        setMsjType('success');
        setPersons(persons.concat(createdPerson))
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMsjType('error')
        setMessage(error.response.data.error)
      })
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
      <Notification message={Message} type={msjType} />
      <Filter value={filtered} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Contacts persons={persons} deleteContact={handleDeleteContact} filteredPersons={filteredPersons} filtered={filtered} />
    </div>
  )
}

export default App
