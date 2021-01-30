import React, { useState } from 'react'
import { Form, message, Spin } from 'antd';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import DestinationForm from '../../Components/Form/DestinationForm';

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
        <center>
            <p style={{ fontSize: 52, margin: "20px" }}>Edit Destination Form</p>
            <DestinationForm onFinish={onFinish} form={form} />
            { editing ? <Spin size="large" /> : ""}
        </center>
    )
}

const EDIT_DESTINATION = gql`
mutation updateDestination($data: DestinationUpdateInput!,$id: DestinationWhereUniqueInput!){
    updateDestination(data: $data,where: $id)
    {
        id
        name
        location
        description
        image{
            url
        }
    }
}
`

export default EditDestination