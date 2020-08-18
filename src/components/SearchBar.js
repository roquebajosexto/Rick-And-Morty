import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'


export default function SearchBar(props) {

    return (
        <InputGroup className="mb-3">
            <FormControl
                onChange={props.onChange}
                placeholder="Ingresa Personaje"
                aria-label="Ingresa Personaje"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="info" onClick={props.onClick}>Buscar</Button>
            </InputGroup.Append>
        </InputGroup >
    )
}


