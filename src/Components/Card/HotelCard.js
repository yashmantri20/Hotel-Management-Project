import React from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const HotelCard = ({ id, name, url }) => {
    return (
        <Link to={`/hotels/${id}`}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="homeimage" src={url} height={180} />}
            >
                <Meta title={name} />
            </Card>
        </Link>
    )
}

export default HotelCard
