import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../configs/axios'

export interface IProduct {
    id?: number,
    name: string,
    price: number,
    description: string
}
const Products = () => {
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: async()=> {
            try {
                return await instance.get(`products`)
            } catch (error) {
                throw new Error('Call API thất bại')
                
            }
        }
    })
    const {mutate} = useMutation({
        mutationFn: async(id:number)=> {
            try {
                return await instance.delete(`products/${id}`)
            } catch (error) {
                throw new Error('Xóa sản phẩm thất bại')
            }
        },
        onSuccess: ()=> {
            messageApi.open({
                type: 'success',
                content: 'Xóa sản phẩm thanh công !!!',
              });
              queryClient.invalidateQueries({
                queryKey:['products']
              })
        },
        onError: ()=> {
            messageApi.open({
                type: 'error',
                content: 'Xóa sản phẩm thất bại',
              });
        }
    })
    const dataSource = data?.data.map((product:IProduct)=> {
        return {
            key: product.id,
            ...product
        }
    })
    const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          key: 'action',
          render: (_:any, product: IProduct)=> {
            return (
                <>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={()=> mutate(product.id!)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                    
                    <hr />
                    <Button danger><Link to={`/admin/products/${product.id}/edit`}>Sửa</Link></Button>

                </Popconfirm>
                </>
            )
          }
        },
      ];
if (isLoading) return <div>Loading...</div>
if(isError) return <div>{error.message}</div>
  return (
    <div>
        {contextHolder}
    <div className='flex items-center justify-between mb-5'>
        <h1 className='text-2xl'>QUẢN LÝ SẢN PHẨM</h1>
        <Button><Link to={`/admin/products/add`}>THÊM MỚI</Link></Button>
    </div>
        <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Products