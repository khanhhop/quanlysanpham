import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message } from 'antd'
import { FormProps, useForm } from 'antd/es/form/Form';
import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../configs/axios';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
    email?: string;
    password?: string;
  };
const Register = () => {
    const [form] = useForm()
    const {mutate} = useMutation({
        mutationFn: async(user:FieldType)=> {
            try {
                return await instance.post(`/users`,user)
            } catch (error) {
                throw new Error('Đăng ký thất bại')
            }
        },
        onSuccess: ()=> {
            messageApi.open({
                type: 'success',
                content: 'Đăng ký thành công !!!',
              });
              form.resetFields()
        },
        onError: ()=> {
            messageApi.open({
                type: 'error',
                content: 'Đăng ký thất bại',
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
    <div>
    <div className='flex items-center justify-between mb-5'> 
    {contextHolder}
        <h1 className='text-2xl text-center'>ĐĂNG KÝ </h1>
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
      label="email"
      name="email"
      rules={[{ required: true},{
        type: 'email',
        message: ' vui lòng nhập đúng định dạng email'
      }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>    
    </div>
    </div>
  )
}

export default Register