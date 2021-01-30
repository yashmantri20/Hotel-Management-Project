import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Row, Col } from 'antd';
import HotelCard from '../../Components/Card/HotelCard';
import { Pagination, Spin } from "antd";
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';


const style = { padding: '20px' };
const loadingstyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
}

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

    const { loading, error, data } = useQuery(FETCH_HOTELS, {
        fetchPolicy: 'cache-and-network'
    });

    return (
        < div >
            <Link to="/hotels/create">
                <IoMdAddCircle size="50px" style={{ position: "fixed", zIndex: "1", bottom: 30, right: 40 }} />
            </Link>

            { error && <h1>Error</h1>}

            {
                loading ? <Spin size="large" style={loadingstyle} /> :
                    <div style={{ marginTop: 12 }}>
                        <p style={{ textAlign: "center", marginBottom: 8, fontSize: 42, fontWeight: 600 }}>HOTELS</p>
                        <Row justify="center" gutter={[0, 24]}>
                            {data.hotels.slice(pagination.minIndex, pagination.maxIndex).map(hotel =>
                                <Col key={hotel.id} style={style}>
                                    <HotelCard
                                        id={hotel.id}
                                        name={hotel.name}
                                        website={hotel.website}
                                        url={hotel.photos.length ? hotel.photos[0].url : "https://ispab.org/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                    />
                                </Col>
                            )
                            }

                        </Row>
                        <center>
                            <Pagination
                                total={data.hotels.length}
                                onChange={handleChange}
                            />
                        </center>
                    </div>
            }
        </div >
    )
}

const FETCH_HOTELS = gql`
    {
        hotels
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
