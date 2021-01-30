import React from 'react'
import { Spin, Carousel, Tag } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const contentStyle = {
    height: '500px',
    width: "100%",
};

const loadingstyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
}


const SingleDestination = (props) => {

    const destinationId = props.match.params.destinationId;
    const { loading, error, data } = useQuery(FETCH_DESTINATION, {
        variables: {
            id: destinationId
        }
    });

    return (
        <>
            {error && <h1>Error</h1>}
            {loading ? (
                <Spin size="large" style={loadingstyle} />
            ) :
                <div>
                    <Link to={`/destinations/${destinationId}/edit`}>
                        <FiEdit size="40px" style={{ position: "fixed", zIndex: "1", bottom: 30, right: 40 }} />
                    </Link>

                    {data.destination.image ?
                        <Carousel autoplay={true} >
                            <div key={data.destination.id}>
                                <img alt="SingleDestination" src={data.destination.image.url} style={contentStyle} />
                            </div>
                        </Carousel>
                        :
                        <div >
                            <img alt="ImageNotFound" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" style={contentStyle} />
                        </div>
                    }

                    <div style={{ padding: 24 }}>
                        <p style={{ fontSize: 42, margin: 0, fontWeight: 600, lineHeight: 1 }}>{data.destination.name}</p>
                        <h4>{data.destination.location}</h4>
                        <h3 style={{ marginBottom: 10 }}>
                            <Tag color="#000">Best Destination</Tag>
                            <Tag color="#000">Beach</Tag>
                            <Tag color="#000">Best Place</Tag>
                        </h3>

                        <Tag color="#F49242">Vacation | 1000+ Daily Visitors</Tag>

                        <h3 style={{ marginTop: 10 }}>Description : {data.destination.description}</h3>
                    </div>
                </div>
            }
        </>
    )
}



const FETCH_DESTINATION = gql`
query getdesination($id: ID!){
  destination(where: {
    id: $id
  }){
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



export default SingleDestination
