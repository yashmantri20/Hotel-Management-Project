import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import DestinationForm from '../../Components/Form/DestinationForm';
import { EDIT_DESTINATION } from '../../Query/MutationQuery';

const EditDestination = (props) => {

    let history = useHistory();
    const [editing, setEditing] = useState(false);

    const [EditDestination] = useMutation(EDIT_DESTINATION)
    const [form] = Form.useForm();
    const destinationId = props.match.params.destinationId;

    const onFinish = async (values) => {
        try {
            setEditing(true);
            await EditDestination({
                variables: {
                    data: {
                        ...values,
                        image: {
                            connect: {
                                id: values.image
                            }
                        }
                    },
                    id: {
                        id: destinationId
                    }
                }
            })
            form.resetFields();
            message.success("Destination Edited")
            history.push(`/destinations/${destinationId}`)
        } catch (e) {
            message.error("Please Try Again")
        }
    };

    return (
        <>
            <p style={{ fontSize: 52, margin: "20px", textAlign: "center" }}>Edit Destination Form</p>
            <DestinationForm onFinish={onFinish} form={form} />
            { editing ? <center><Spin size="large" /></center> : ""}
        </>
    )
}

export default EditDestination