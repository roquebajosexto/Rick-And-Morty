import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import CardView from './components/CardView'
import PaginationButtons from './components/PaginationButtons'
import SearchBar from './components/SearchBar'
import { Container, Col, Row } from 'react-bootstrap'

var next, prev;
function Home() {
  const history = useHistory()

  const [text, setText] = useState('')
  const [data, setData] = useState([])


  useEffect(() => {
    getCharacters('https://rickandmortyapi.com/api/character/')
  }, [])

  const getCharacters = (link) => {
    console.log(link);
    axios.get(link)
      .then(function (response) {
        setData(response.data.results)
        next = response.data.info.next
        prev = 'https://rickandmortyapi.com/api/character/'
        if (response.data.info.prev != null) {
          prev = response.data.info.prev
        }
        console.log(prev, next);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const getCharacter = () => {
    axios.get(`https://rickandmortyapi.com/api/character/?name=${text}`)
      .then(function (response) {
        if (response.data.info.count === 0) {

          alert('No hubo Resultados')
        } else {
          setData(response.data.results)
        }
      })
      .catch(function (error) {
        alert('No hubo Resultados')
      })
  }



  return (
    <div>
      <Container fluid className="mt-5">
        <h1 className="mt-5 justify-content-center mx-auto">Rick and Morty App</h1>
        <SearchBar onChange={(e) => setText(e.target.value)} onClick={getCharacter} />
        <Row>
          {data.map((character) =>
            <Col key={character.id} sm={3} xs={6} className="mb-5">
              <CardView name={character.name} img={character.image} status={character.status}
                location={character.location.name} species={character.species} episode={character.episode[0]} onClick={() => {
                  history.push(`/personaje/${character.id}`)
                }} />
            </Col>
          )}
        </Row>
        {/* <Pagination /> */}
        <div className="mt-5 justify-content-center mx-auto">
          <PaginationButtons onNext={() => getCharacters(next)} onPrev={() => getCharacters(prev)} />
        </div>
      </Container>
    </div>

  );
}


export default Home;
