import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Row, Col } from 'antd';
import HotelCard from '../Components/Card/HotelCard';
import { Pagination, Affix, Button } from "antd";
import { IoMdAddCircle } from 'react-icons/io';

const Hotel = () => {

    const pageSize = 10;

    const [pagination, setPagination] = useState({
        minIndex: 0,
        maxIndex: pageSize
    })

    const handleChange = (page, pageSize) => {
        setPagination({
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        })
    }

    const { loading, error, data } = useQuery(FETCH_HOTELS);

    return (
        < div >
            <IoMdAddCircle size="50px" style={{ position: "fixed", zIndex: "1", bottom: 30, right: 40 }} />

            { error && <h1>Error</h1>}

            {
                loading ? <h1>Loading..</h1> :
                    <>
                        <Row >
                            {data.hotels.slice(pagination.minIndex, pagination.maxIndex).map(hotel =>
                            (
                                <Col key={hotel.id}>
                                    <HotelCard
                                        name={hotel.name}
                                        website={hotel.website}
                                        url={hotel.photos.length ? hotel.photos[0].url : "https://ispab.org/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                    />
                                </Col>)
                            )
                            }

                        </Row>
                        <Pagination
                            total={data.hotels.length}
                            onChange={handleChange}
                        />
                    </>
            }
        </div >
    )
}

const FETCH_HOTELS = gql`
    {
        hotels(orderBy: createdAt_DESC)
        {
            createdAt
            id
            name
            website
            description
            photos 
            {
                id
                url
            }
        }
    }
`

export default Hotel
