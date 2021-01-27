import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const HotelCard = ({ name, website, url }) => {
    console.log()
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={url} />}
        >
            {name}
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    )
}

export default HotelCard
