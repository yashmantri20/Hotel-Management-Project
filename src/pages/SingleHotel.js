import React from 'react'
import { Carousel } from 'antd';
import { useQuery, gql } from '@apollo/client';


const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const SingleHotel = () => {

    const { loading, error, data } = useQuery(FETCH_HOTEL, {
        variables: {
            id: "ckgn8ft205qzg0869xejipqsh"
        }
    });

    return (
        <>
            {error && <h1>Error</h1>}
            {loading ? "Loading..." :
                <Carousel autoplay={true} >
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            }
        </>
    )
}



const FETCH_HOTEL = gql`
query gethotel($id: ID!)
{
  hotel(where:{
    id: $id
  }){
    id
    name
  }
}

`

export default SingleHotel
