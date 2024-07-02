import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AddNewFood, Food, MakeOrder } from "../components/Misc";
import Order from "../components/Order";
import { readDocuments } from "../fb/function";
import logo from '../assets/tcafe.png'
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const [orders, showOrders] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [foods, showFoods] = useState(false)
    const [activate, setActivate] = useState(false)
    const [items, setItems] = useState([])
    const [item, setItem] = useState(null)

    const navigate = useNavigate();
    

    if(!user){
        navigate('/login')
    }
    useEffect(() => {
        readDocuments({
            path:"foods",
            getData:setItems
        })
    },[])

    const makeOrder = (item) => {
        setActivate(true)
        setItem(item)
        // call firebase function to create order with item details
    }


    return (
        <div className="w-full h-screen">
            {/* Top Navigation bar... */}
            <div className="w-full h-20 flex justify-between items-center  p-3 bg-gray-50">
                <img src={logo} alt={"logo"} />
                <div className="flex w-1/6 items-center justify-between">
                    <button onClick={() => showFoods(!foods)}>Foods</button>
                    <button onClick={() => showOrders(!orders)}>Order</button>
                    <button>Users</button>
                </div>
            </div>


            {/* Main foods components */}
            <h3 className="p-3 text-2xl">Browse your favorite foods.</h3>
            <div className="flex items-center  justify-start flex-wrap gap-2  flex-1 p-10">
                {items?.map((data, idx) => (
                    <Food key={idx} data={data} user={null} makeOrder={makeOrder}/>
                ))}
            </div>

            <AnimatePresence>
                {orders && <Order />}
                {foods && <AddNewFood />}
                {activate && <MakeOrder order={item} user={user}/>}

            </AnimatePresence>
        </div>
    )
}