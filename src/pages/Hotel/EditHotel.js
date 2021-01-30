import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation, gql } from '@apollo/client';
import HotelForm from '../../Components/Form/HotelForm';
import { useHistory } from 'react-router-dom';

const EditHotel = (props) => {

    let history = useHistory();
    const [editing, setEditing] = useState(false);

    const [editHotel] = useMutation(EDIT_HOTEL)
    const [form] = Form.useForm();
    const hotelId = props.match.params.hotelId;

    const onFinish = async (values) => {
        try {
            setEditing(true);
            await editHotel({
                variables: {
                    data: {
                        ...values,
                        rooms: parseInt(values.rooms)
                    },
                    id: {
                        id: hotelId
                    }
                }
            })
            form.resetFields();
            message.success("Hotel Edited")
            history.push(`/hotels/${hotelId}`)
        } catch (e) {
            setEditing(false)
            message.error("Please Try Again")
        }
    };

    return (
        <>
            <p style={{ fontSize: 52, margin: "20px", textAlign: "center" }}>Edit Hotel Form</p>
            <HotelForm onFinish={onFinish} form={form} />
            { editing ? <center><Spin size="large" /></center> : ""}
        </>
    )
}

const EDIT_HOTEL = gql`
mutation updateHotel($data: HotelUpdateInput!,$id: HotelWhereUniqueInput!){
    updateHotel(data: $data,where: $id){
      id
      name
      description
      rooms
      phone
    }
  }
`;

export default EditHotel