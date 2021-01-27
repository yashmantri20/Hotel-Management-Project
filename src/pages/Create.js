import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { useMutation, gql } from '@apollo/client';

const Create = () => {

    const [createHotel] = useMutation(CREATE_HOTEL)

    const onFinish = async (values) => {
        try {
            await createHotel({
                variables: {
                    data: {
                        ...values,
                        rooms: parseInt(values.rooms)
                    }
                }
            })
            message.success("Hotel Created")

        } catch (e) {
            message.error("Hotel Already Exists")
        }
    };

    return (
        <>
            <p style={{ fontSize: 52 }}>Hotel Form</p>
            <Form
                labelAlign="left"
                labelCol={{ span: 3, offset: 2 }}
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

                {/* <Form.Item
                    label="Image1 Link"
                    name="photos"
                    rules={[{ required: true, message: 'Please Enter the ImageLink!' }]}
                >
                    <Input placeholder="Please Enter the ImageLink" />
                </Form.Item> */}

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



                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

const CREATE_HOTEL = gql`
mutation createHotel(
    $data: HotelCreateInput!
  )
  {
    createHotel(
        data: $data
    )
    {
        id
        name
        description
        rooms
        phone
        photos{
           url
        }
    }
  }
`;

export default Create
