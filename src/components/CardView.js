import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function CardView(props) {
    const [episode, setEpisode] = useState('')
    useEffect(() => {
        axios.get(props.episode)
            .then(function (response) {
                setEpisode(response.data.name)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    var statusColor = "gray"

    if (props.status === 'Alive') {
        statusColor = 'green'
    } else if (props.status === 'Dead') {
        statusColor = 'red'
    }

    return (
        <Card onClick={props.onClick} >
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    <FontAwesomeIcon icon={faCircle} size="xs" color={statusColor} />
                    &nbsp;{props.status} - {props.species}
                </Card.Text>
                <Card.Text>
                    Last known location:
                    <br />
                    {props.location}
                </Card.Text>
                <Card.Text>
                    First seen in:
                    <br />
                    {episode}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


