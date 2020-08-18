import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function Personaje() {

    const [data, setData] = useState({});
    const [locationInfo, setLocationInfo] = useState({});
    const [episodesList, setEpisodesList] = useState([]);
    const [visible, setVisible] = useState(false);
    var { id } = useParams();


    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(function (response) {
                setData(response.data)
                getEpisodes(response.data.episode)
                getLocation(response.data.location?.url)

            })
            .catch(function (error) {
                //  console.log(error);
            })
    }, [])

    const getEpisodes = (episodes) => {
        episodes.forEach(episode => {
            axios.get(episode)
                .then(function (response) {
                    setEpisodesList(episodesList => [...episodesList, response.data])
                })
                .catch(function (error) {
                })
        });
    }

    const getLocation = (location) => {

        axios.get(location)
            .then(function (response) {
                setLocationInfo(response.data)

            })
            .catch(function (error) {
            })

    }

    const episodesMap = episodesList.map((episode) =>

        <ListGroup.Item key={(episode.id).toString()}> {episode.name}</ListGroup.Item>
    );



    var statusColor = "gray"

    if (data.status === 'Alive') {
        statusColor = 'green'
    } else if (data.status === 'Dead') {
        statusColor = 'red'
    }

    var date = new Date(data.created)
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour12: "false" };
    //console.log(episodes);
    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={data.image} />
                <Card.Body className="text-center">
                    <Card.Title className="text-center">{data.name} </Card.Title>
                    <Card.Text className="text-center">
                        <FontAwesomeIcon icon={faCircle} size="xs" color={statusColor} />
                        &nbsp;{data.status} - {data.species}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted text-center"> Last known location:</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted text-center">Gender:</Card.Subtitle>
                    <Card.Text className="text-center">
                        {data.gender}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted text-center"> Created:</Card.Subtitle>
                    <Card.Text className="text-center">
                        {date.toLocaleString('es-MX', options)}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted text-center"> Location:</Card.Subtitle>
                    <Card.Text className="text-center">
                        {data.location?.name}
                        {/* {data.location.name} */}
                    </Card.Text>
                    <Card.Subtitle className="mb-3 text-muted text-center"> type(location):</Card.Subtitle>
                    <Card.Text className="text-center">
                        {locationInfo.type}
                    </Card.Text>
                    <Button variant="primary" className="text-center" onClick={() => setVisible(!visible)}>{!visible ? "Mostrar episodios" : "Ocultar episodios"}</Button>
                    {visible ? <ListGroup variant="flush text-center"> {episodesMap} </ListGroup> : ""}
                </Card.Body>
            </Card>

        </Container>


    );
}


export default Personaje;
