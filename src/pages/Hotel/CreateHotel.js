import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import HotelForm from '../../Components/Form/HotelForm';
import { useHistory } from 'react-router-dom';
import { CREATE_HOTEL } from '../../Query/MutationQuery';

const CreateHotel = () => {

    let history = useHistory();

    const [createHotel] = useMutation(CREATE_HOTEL)
    const [form] = Form.useForm();
    const [creating, setCreating] = useState(false);

    const onFinish = async (values) => {
        try {
            let arr = values.photos.map(url => ({
                id: url
            }))
            setCreating(true);
            await createHotel({
                variables: {
                    data: {
                        ...values,
                        amenities: {
                            set: values.amenities
                        },
                        rooms: parseInt(values.rooms),
                        photos: {
                            connect: arr
                        }
                    }
                }
            })
            form.resetFields();
            message.success("Hotel Created")
            history.push('/hotels')
        } catch (e) {
            setCreating(false)
            message.error("Hotel Already Exists")
        }
    };

    return (
        <>
            <p style={{ fontSize: 52, margin: "20px", textAlign: "center" }}>Create Hotel Form</p>
            <HotelForm onFinish={onFinish} form={form} />
            { creating ? <center><Spin size="large" /></center> : ""}
        </>
    )
}

export default CreateHotel
