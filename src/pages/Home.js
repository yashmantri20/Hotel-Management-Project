import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Row, Col } from 'antd';
import HotelCard from '../Components/Card/HotelCard';


const Home = () => {

    const { loading, error, data } = useQuery(FETCH_HOTELS);

    return (

        < div >
            { error && <h1>Error</h1>}

            {
                loading ? <h1>Loading..</h1> :
                    <>
                        <Row >
                            {data.hotels.slice(0, 15).map(hotel =>
                                <Col key={hotel.id}>
                                    <HotelCard
                                        name={hotel.name}
                                        website={hotel.website}
                                        url={hotel.photos.length ? hotel.photos[0].url : "https://ispab.org/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                    />
                                </Col>)
                            }
                        </Row>
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

export default Home
