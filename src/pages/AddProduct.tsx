import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message } from 'antd'
import { FormProps, useForm } from 'antd/es/form/Form';
import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../configs/axios';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
    name?: string;
    price?: number;
    description?: string;
  };

const AddProduct = () => {
    const [form] = useForm()
    const {mutate} = useMutation({
        mutationFn: async(product:FieldType)=> {
            try {
                return await instance.post(`/products`,product)
            } catch (error) {
                throw new Error('Thêm sản phẩm thất bại')
            }
        },
        onSuccess: ()=> {
            messageApi.open({
                type: 'success',
                content: 'Thêm sản phẩm thành công !!!',
              });
              form.resetFields()
        },
        onError: ()=> {
            messageApi.open({
                type: 'error',
                content: 'Thêm sản phẩm thất bại',
              });
        }
    })

    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        mutate(values)
      };

  return (
   <div>
    <div className='flex items-center justify-between mb-5'> 
    {contextHolder}
        <h1 className='text-2xl'>THÊM MỚI SẢN PHẨM</h1>
        <Button><Link to={`/admin/products`}>QUAY LẠI</Link></Button>
     </div>  
      <Form
    form = {form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="name"
      name="name"
      rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="price"
      name="price"
      rules={[{ required: true}, {
        type: 'number',
        message: 'Gía phải lớn hơn 0!',
        min: 0,
      }]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item<FieldType>
      label="description"
      name="description"
    >
      <TextArea rows={6}/>
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>    
    </div>
  )
}

export default AddProduct