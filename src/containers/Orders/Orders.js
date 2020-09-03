import React,{Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const data = await axios.get('/orders.json');
             console.log('Orders data',data.data);
            const fetchOrders = [];
            for (let key in data.data) {
                fetchOrders.push({
                    ...data.data[key],
                    id: key
                })
            }
            this.setState({loading:false, orders: fetchOrders});
        }catch (err) {
            this.setState({loading: false});
        }
        
    }
    render() {

        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                         key={order.id}
                         ingredients={order.ingredients}
                         price={order.totalPrice} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);