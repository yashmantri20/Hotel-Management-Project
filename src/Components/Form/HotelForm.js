import React, { useState } from 'react'
import { Form, Input, Button, Tag, Select, Spin } from 'antd';
import { gql, useQuery } from '@apollo/client';

// const { CheckableTag } = Tag;

const { Option } = Select;

const loadingstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const tagsData = [{
    id: "1",
    value: "Garden"
},
{
    id: "2",
    value: "Pool"
},
{
    id: "3",
    value: "Wifi"
},
{
    id: "4",
    value: "AC"
},
{
    id: "5",
    value: "TV"
}
]

const HotelForm = ({ onFinish, form }) => {

    const { loading, error, data } = useQuery(FETCH_ASSETS);

    return (
        <>
            {error && <h1>Error</h1>}
            {
                loading ? <Spin size="large" style={loadingstyle} /> :

                    <Form
                        form={form}
                        labelAlign="left"
                        labelCol={{ span: 4, offset: 2 }}
                        style={{ width: "70%", margin: "auto" }}
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please Enter Hotel Name!' }]}
                        >
                            <Input placeholder="Please Enter Hotel Name" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please Enter the Description!' }]}
                        >
                            <Input.TextArea placeholder="Please Enter the Description" />
                        </Form.Item>

                        <Form.Item
                            label="Amenities"
                            name="amenities"
                            rules={[{ required: true, message: 'Please Select One Amenitie!' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select an amenitie"
                                optionLabelProp="label"
                            >
                                {tagsData.map(service =>
                                    <Option key={service.id} value={service.value} label={service.value}>
                                        <div className="demo-option-label-item">
                                            {service.value}
                                        </div>
                                    </Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="photos"
                            rules={[{ required: true, message: 'Please Select One Asset!' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="select one asset"
                                // onChange={handleChange}
                                optionLabelProp="label"
                            >
                                {data.assets.map(image =>
                                    <Option key={image.id} value={image.id} label={image.url}>
                                        <div className="demo-option-label-item">
                                            {image.url}
                                        </div>
                                    </Option>
                                )}
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Rooms"
                            name="rooms"
                            rules={[{ required: true, message: 'Please Enter the Rooms!' }]}
                        >
                            <Input type="number" placeholder="Please Enter the Rooms" />
                        </Form.Item>

                        <Form.Item
                            label="Phone No"
                            name="phone"
                            rules={[{
                                required: true,
                                message: 'Please Enter the Phone No!',
                                len: 10
                            }]}
                        >
                            <Input placeholder="Please Enter the Phone No" />

                        </Form.Item>

                        <Form.Item
                            label="Website"
                            name="website"
                            rules={[{ required: true, message: 'Please Enter the Website!' }]}
                        >
                            <Input placeholder="Please Enter the Website" />
                        </Form.Item>


                        <center>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add a Hotel
                    </Button>
                            </Form.Item>
                        </center>
                    </Form>
            }
        </>
    )
}

const FETCH_ASSETS = gql`
{
  assets{
    id
    url
  }
}
`

export default HotelForm
