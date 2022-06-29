import React from 'react'
import Person from './Person'

const Contacts = ({ persons, filteredPersons, filtered, deleteContact }) => {
    return (
        <>
            <ul>
                {filtered === '' ?
                    persons.map(p =>
                        <Person deleteContact={deleteContact} id={p.id} key={p.id} name={p.name} phone={p.number} />)
                    : filteredPersons.map(p =>
                        <Person id={p.id} key={p.id} name={p.name} phone={p.number} />)}
            </ul>
        </>
    )
}

export default Contacts