import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import HotelForm from '../../Components/Form/HotelForm';
import { useHistory } from 'react-router-dom';
import { EDIT_HOTEL } from '../../Query/MutationQuery';

const EditHotel = (props) => {

    let history = useHistory();
    const [editing, setEditing] = useState(false);

    const [editHotel] = useMutation(EDIT_HOTEL)
    const [form] = Form.useForm();
    const hotelId = props.match.params.hotelId;

    const onFinish = async (values) => {
        try {
            let arr = values.photos.map(url => ({
                id: url
            }))
            setEditing(true);
            await editHotel({
                variables: {
                    data: {
                        ...values,
                        amenities: {
                            set: values.amenities
                        },
                        rooms: parseInt(values.rooms),
                        photos: {
                            set: arr
                        }
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

export default EditHotel