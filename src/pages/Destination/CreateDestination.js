import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import DestinationForm from '../../Components/Form/DestinationForm';
import { useHistory } from 'react-router-dom';
import { CREATE_DESTINATION } from '../../Query/MutationQuery';

const CreateDestination = () => {

    let history = useHistory();
    const [creating, setCreating] = useState(false);

    const [createDestination] = useMutation(CREATE_DESTINATION)
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setCreating(true);
            await createDestination({
                variables: {
                    data: {
                        ...values,
                        image: {
                            connect: {
                                id: values.image
                            }
                        }
                    }
                }
            })
            form.resetFields();
            message.success("Destination Added")
            history.push('/destinations')

        } catch (e) {
            setCreating(false)
            message.error("Destination Already Exists")
        }
    };

    return (
        <>
            <p style={{ fontSize: 52, margin: "20px", textAlign: "center" }}>Create Destination Form</p>
            <DestinationForm onFinish={onFinish} form={form} />
            { creating ? <center><Spin size="large" /></center> : ""}
        </>
    )
}

export default CreateDestination
