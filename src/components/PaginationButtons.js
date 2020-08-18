import React from 'react'
import { Pagination } from 'react-bootstrap'


export default function PaginationButtons(props) {

    return (
        <  Pagination className="text-center" >
            <Pagination.Prev onClick={props.onPrev} />
            <Pagination.Next onClick={props.onNext} />
        </Pagination >
    )
}


