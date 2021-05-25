import React, { useEffect, useState } from 'react'
import History from './History'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import '../styles/myOrder_styles.css';
function OrderHistory() {
    const [ongoing, setOngoing] = useState([]);
    const [history, setHistory] = useState([]);
    const userEmail = useSelector(state => state.user.userEmail);
    useEffect(() => {
        const request = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                const token = userData.stsTokenManager.accessToken
                const fetchData = axios.create({
                    baseURL: 'http://52.66.249.12:3002'
                })
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await fetchData.get('get-order-history', config);
                // console.log(data)
                setOngoing(data['all_orders'].ongoing);
                setHistory(data['all_orders'].history);
            }
            catch (error) {
                console.log(error.message)
            }
        }
        request()

    }, []);
    
    return (
    <>
    
    {userEmail == null && <Redirect to="/email" />}
    <main className="amain blocky summary">
        <div >
            <h1 className="ah1"><u>My Orders</u></h1>
        </div>
        <div className="bgOrder">
            {ongoing.map(order =>
                <History order={order}></History>
            )}
            {history.map(order =>
                <History order={order}></History>
            )}
        </div>
    </main>
    </>
    );
}

export default OrderHistory;
