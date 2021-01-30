import React from 'react'
import { Form, Input, Button, Spin, Select } from 'antd';
import { useQuery } from '@apollo/client';
import { FETCH_ASSETS } from '../../Query/FetchQuery';

const loadingstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const { Option } = Select;

const DestinationForm = ({ onFinish, form }) => {
    const { loading, error, data } = useQuery(FETCH_ASSETS);

    return (
        <>
            {error && <h1>Error</h1>}
            {
                loading ? <Spin size="large" style={loadingstyle} /> :
                    <Form
                        form={form}
                        labelAlign="center"
                        labelCol={{ span: 3, offset: 2 }}
                        style={{ width: "70%", margin: "auto" }}
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please Enter Destination Name!' }]}
                        >
                            <Input placeholder="Please Enter Destination Name" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please Enter the Description!' }]}
                        >
                            <Input.TextArea placeholder="Please Enter the Description" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please Select One Asset!' }]}
                        >
                            <Select
                                placeholder="Select an asset"
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
                            label="Location"
                            name="location"
                            rules={[{ required: true, message: 'Please Enter the Location!' }]}
                        >
                            <Input placeholder="Please Enter the Location" />
                        </Form.Item>

                        <Form.Item>
                            <center>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </center>
                        </Form.Item>
                    </Form>
            }
        </>
    )
}

export default DestinationForm
