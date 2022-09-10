import React, {useEffect} from 'react'
import { Avatar, List} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.scss';
import { fetchProducts, setModalState, setEditProduct, setModalEdit } from '../../store/actions';
import {deleteProduct} from './../../store/actions'
import ProductForm from '../ProductForm/ProductForm';


const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
    const productsLoading = useSelector((store) => store.productsLoading)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const showModal = () => {
        dispatch(setModalState(true));
    };
    
    const handleEdit = (values) => {
        dispatch(setEditProduct(values))
        dispatch(setModalEdit(false))
        showModal()
    }
    
    const deleteItem = (values) => {
        dispatch(deleteProduct(values))
    }

  return (
   <div className='list'>
    <ProductForm/>
    <h1 className='product-list'> Product List</h1>
     <List
        loading={productsLoading}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
        <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={<a href="/">{item.name}</a>}
            description={<div>{item.price}</div>}
            />
            
            <div className="btn">
                <button 
                  className='edit' 
                  onClick={() => handleEdit(item)}> 
                  Edit 
                </button>

                <button 
                  className='delete' 
                  onClick={()=>{deleteItem(item.id)}}> 
                  Delete 
                </button>
            </div>
        </List.Item>
        )}
    />   
   </div>
  )
}

export default ProductList