import React from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const DestinationCard = ({ id, name, image }) => {

    return (
        <Link to={`/destinations/${id}`}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="homeimage" src={image} height={180} />}
            >
                <Meta title={name} />
            </Card>
        </Link>
    )
}

export default DestinationCard
