import React from 'react'
import { Spin, Carousel, Tag, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { DELETE_HOTEL } from '../../Query/MutationQuery';
import { FETCH_HOTEL } from '../../Query/FetchQuery';

const contentStyle = {
    maxHeight: '460px',
    width: "100%",
};

const loadingstyle = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
}

const SingleHotel = (props) => {

    let history = useHistory();

    const hotelId = props.match.params.hotelId;
    const { loading, error, data } = useQuery(FETCH_HOTEL, {
        variables: {
            id: hotelId
        }
    });

    const [deleteHotel] = useMutation(DELETE_HOTEL);

    const handleClick = async () => {
        try {
            await deleteHotel({
                variables: {
                    id: hotelId
                }
            })
            message.success("Hotel Deleted")
            history.push('/hotels')
        } catch (e) {
            message.error("Please Try Again")
        }
    };
    return (
        <>
            { error && <h1>Error</h1>}
            { loading ? <Spin size="large" style={loadingstyle} /> :
                <div>
                    {data && data.hotel ?
                        <div>
                            <Link to={`/hotels/${hotelId}/edit`}>
                                <FiEdit size="35px" style={{ position: "fixed", zIndex: "1", bottom: 30, right: 100 }} />
                            </Link>
                            <FiDelete onClick={handleClick} size="40px" style={{ cursor: "pointer", position: "fixed", zIndex: "1", bottom: 30, right: 40 }} />

                            {data.hotel.photos.length ?
                                <Carousel autoplay={true} >
                                    {data.hotel.photos.map(hotelImg =>
                                        <div key={hotelImg.id}>
                                            <img alt="SingleHotel" src={hotelImg.url} style={contentStyle} />
                                        </div>
                                    )}
                                </Carousel>
                                :
                                <div >
                                    <img alt="ImageNotFound" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" style={contentStyle} />
                                </div>
                            }
                            <div style={{ padding: 24 }}>
                                <p style={{ fontSize: 42, margin: 0, fontWeight: 600, lineHeight: 1.5 }}>{data.hotel.name}</p>
                                <h4>{data.hotel.website}</h4>
                                <h3 style={{ marginBottom: 10 }}>
                                    <Tag color="#000">Best Hotel</Tag>
                                    <Tag color="#000">TownHouse</Tag>
                                    <Tag color="#000">Since 2005</Tag>
                                </h3>

                                <Tag color="#F49242">Sanitised B4 Ur Eyes | 1000+ Happy Customers</Tag>

                                <h3 style={{ marginTop: 10 }}>Description : {data.hotel.description}</h3>
                                <h3 style={{ marginTop: 10 }}>Amenities :</h3>
                                <h3 style={{ lineHeight: 1 }}>
                                    {data.hotel.amenities.map(amenitie => <Tag key={amenitie} color="#000">{amenitie}</Tag>
                                    )}
                                </h3>
                                <h3 style={{ marginTop: 10 }}>Rooms : {data.hotel.rooms}</h3>
                                <h3 style={{ marginTop: 10 }}>Phone Number : {data.hotel.phone}</h3>
                            </div>
                        </div> : <h1>Hotel does not exist</h1>
                    }
                </div>
            }
        </>
    )
}

export default SingleHotel
