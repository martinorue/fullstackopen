import React from "react"
import Button from "./Button"

const Person = ({ name, phone, deleteContact, id }) => {
    return (
        <li>
            {name} {phone} <Button text='delete' handleClick={() => deleteContact(id)}></Button>
        </li>
    )
}

export default Person