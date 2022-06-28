import React from 'react'
import Person from './Person'

const Contacts = ({ persons, filteredPersons, filtered }) => {
    return (
        <ul>
            {filtered === '' ?
                persons.map(p =>
                    <Person key={p.id} name={p.name} phone={p.number} />)
                : filteredPersons.map(p =>
                    <Person key={p.id} name={p.name} phone={p.number} />)}
        </ul>
    )
}

export default Contacts