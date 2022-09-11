import React, {useEffect, useState} from 'react'
import { Avatar, List, Modal} from 'antd';
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

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const showDetailModal = () => {
      setIsDetailModalOpen(true);
    };
    const hideDetailModal = () => {
      setIsDetailModalOpen(false);
    };

  
  return (
   <div className='list'>
    <ProductForm/>
    <h1 className='product-list'> Product List</h1>

     <List
        className='list_item'
        loading={productsLoading}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
        <List.Item 
>
            <List.Item.Meta
            onClick={showDetailModal}
            avatar={<Avatar
                size={"large"}
                src={item.image} />}
            title={<a href="/">{item.name}</a>}
            description={<div>{item.price}</div>}
            />
        <Modal
        footer={false}
         title="Basic Modal"
        open={isDetailModalOpen}
        onCancel={hideDetailModal}
        >
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <img src={item.image} alt="" />
        </Modal>
            <div className="btn">
            <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="" onClick={() => handleEdit(item)} height="30px"/>
            <img src="https://img.icons8.com/ios-glyphs/344/multiply.png" alt=""  onClick={()=>{deleteItem(item.id)}} height="35px" />
            </div>
        </List.Item>
        )}
    />   
   </div>
  )
}

export default ProductList