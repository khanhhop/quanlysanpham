import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message } from 'antd'
import { FormProps, useForm } from 'antd/es/form/Form';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import instance from '../configs/axios';
import TextArea from 'antd/es/input/TextArea';
import { IProduct } from './Products';

type FieldType = {
    name?: string;
    price?: number;
    description?: string;
  };

const EditProduct = () => {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['product',id],
        queryFn: async()=> {
            try {
                return await instance.get(`/products/${id}`)
            } catch (error) {
                throw new Error('Call API thất bại')
                
            }
        }
    })
    const {mutate} = useMutation({
        mutationFn: async(product:FieldType)=> {
            try {
                return await instance.put(`/products/${id}`,product)
            } catch (error) {
                throw new Error('Sửa sản phẩm thất bại')
            }
        },
        onSuccess: ()=> {
            messageApi.open({
                type: 'success',
                content: 'Sửa sản phẩm thành công!!!',
              });
              queryClient.invalidateQueries({
                queryKey:['product']
              })
        },
        onError: ()=> {
            messageApi.open({
                type: 'error',
                content: 'Sửa sản phẩm thất bại',
              });
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        mutate(values)
      };
      if (isLoading) return <div>Loading...</div>
      if(isError) return <div>{error.message}</div>
  return (
   <div>
    <div className='flex items-center justify-between mb-5'> 
    {contextHolder}
        <h1 className='text-2xl'>SỬA SẢN PHẨM</h1>
        <Button><Link to={`/admin/products`}>QUAY LẠI</Link></Button>
     </div>  
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{...data?.data}}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="name"
      name="name"
      rules={[{ required: true, message: 'Vui long nhap ten san pham!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="price"
      name="price"
      rules={[{ required: true}, {
        type: 'number',
        message: 'Gia phai lon hon 0!',
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

export default EditProduct