import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purcahseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purcahseBurgerFail = (error)=> {
    return { 
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
     }
}

const purcahseBurgerStart = ()=> {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purcahseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purcahseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
                .then(response=> {
                   dispatch(purcahseBurgerSuccess(response.data.name,orderData));
                })
                .catch(err=> {
                    dispatch(purcahseBurgerFail(err));
                });
    }
}

export const purchaseInit = ()=> {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const fetchOrdersSuccess = (orders)=> {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

//  export const fetchOrders =  () => {
//     return async( dispatch) => {
//         try {
//             dispatch(fetchOrdersStart());
//             const data = await axios.get('/orders.json');
//              console.log('Orders data',data.data);
//             const fetchOrders = [];
//             for (let key in data.data) {
//                 fetchOrders.push({
//                     ...data.data[key],
//                     id: key
//                 })
//             }
//             dispatch(fetchOrdersSuccess(fetchOrders));
//         }catch (err) {
//             dispatch(fetchOrdersFail(err));
//         }
//     }
// }

export const fetchOrders =  (token,userId) => {
    return  dispatch => {
            dispatch(fetchOrdersStart());
            const querParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
            axios.get('/orders.json'+querParams)
                .then( res=> {
                    const fetchOrders = [];
                    for (let key in res.data) {
                        fetchOrders.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                    dispatch(fetchOrdersSuccess(fetchOrders));
                }).catch(err=> {
                    dispatch(fetchOrdersFail(err));
                })
        }
    }