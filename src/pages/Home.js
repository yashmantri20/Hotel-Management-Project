import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Row, Col, Spin } from 'antd';
import HotelCard from '../Components/Card/HotelCard';

const style = { padding: "16px" }

const loadingstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
}

const Home = () => {

    const { loading, error, data } = useQuery(FETCH_HOTELS, {
        fetchPolicy: 'cache-and-network'
    });

    return (
        < div >
            { error && <h1>Error</h1>}

            {
                loading ? <Spin size="large" style={loadingstyle} />
                    :
                    <div style={{ marginTop: 12 }}>
                        <p style={{ textAlign: "center", marginBottom: 12, fontSize: 42, fontWeight: 600 }}>TOP 10 HOTELS</p>
                        <Row justify="center" gutter={[0, 24]}>
                            {data.hotels.slice(0, 10).map(hotel =>
                                <Col key={hotel.id} style={style}>
                                    <HotelCard
                                        id={hotel.id}
                                        name={hotel.name}
                                        website={hotel.website}
                                        url={hotel.photos.length ? hotel.photos[0].url : "https://ispab.org/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                    />
                                </Col>)
                            }
                        </Row>
                    </div>
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
