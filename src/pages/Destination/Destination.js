import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Row, Col } from 'antd';
import { Pagination, Spin } from "antd";
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import DestinationCard from '../../Components/Card/DestinationCard';


const style = { padding: '16px' };

const loadingstyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
}


const Destination = () => {

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

    const { loading, error, data } = useQuery(FETCH_DESTINATIONS, {
        fetchPolicy: 'cache-and-network'
    });

    return (
        < div >
            <Link to="/destinations/createdestination">
                <IoMdAddCircle size="50px" style={{ position: "fixed", zIndex: "1", bottom: 30, right: 40 }} />
            </Link>

            { error && <h1>Error</h1>}

            {
                loading ? <Spin size="large" style={loadingstyle} /> :
                    <div style={{ marginTop: 12 }}>
                        <p style={{ textAlign: "center", marginBottom: 10, fontSize: 42, fontWeight: 600 }}>DESTINATIONS</p>
                        <Row justify="center" gutter={[0, 24]}>
                            {data.destinations.slice(pagination.minIndex, pagination.maxIndex).map(destination =>
                                <Col key={destination.id} style={style}>
                                    <DestinationCard
                                        id={destination.id}
                                        name={destination.name}
                                        location={destination.location}
                                        image={destination.image ? destination.image.url : "https://ispab.org/wp-content/themes/consultix/images/no-image-found-360x260.png"}
                                    />

                                </Col>
                            )

                            }

                        </Row>
                        <center>
                            <Pagination
                                total={data.destinations.length}
                                onChange={handleChange}
                            />
                        </center>
                    </div>
            }
        </div >
    )
}

const FETCH_DESTINATIONS = gql`
   {
  destinations{
    id
    name
    location
    description
    image{
      url
    }
  }
}
`

export default Destination
