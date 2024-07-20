import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AddNewFood, Food, MakeOrder } from "../components/Misc";
import Order from "../components/Order";
import { readDocuments, insertData } from "../fb/function";
import logo from '../assets/tcafe.png'
import { useNavigate } from "react-router-dom";
import { Feedback } from "../components/Motion";
import { BiSolidLogOut } from "react-icons/bi";

export default function Dashboard() {
    const [orders, showOrders] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [response, setResponse] = useState({ open: false, message: "", type: "" })
    const [foods, showFoods] = useState(false)
    const [activate, setActivate] = useState(false)
    const [items, setItems] = useState([])
    const [item, setItem] = useState(null)

    const navigate = useNavigate();




    useEffect(() => {
        readDocuments({
            path: "foods",
            getData: setItems
        })

    }, [])

    // console.log(users)

    const makeOrder = (item) => {

        setActivate(true)
        setItem(item)
        // call firebase function to create order with item details

        if (!user) {
            navigate('/login')
        }

        insertData({
            path: "orders",
            docID: new Date().getTime().toString(),
            data: {
                user: user.uid,
                ...item
            },
            setResponse
        })
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }


    return (
        <div className="w-full h-screen">
            {/* Top Navigation bar... */}
            <div className="w-full h-20 flex justify-between items-center  p-3 bg-gray-50">
                <img src={logo} alt={"logo"} className="w-20 h-20 object-contain" />
                <div className="flex w-auto items-center justify-between">

                    {user?.role === "admin" &&
                        <div className="flex items-center gap-2">
                            <button onClick={() => showFoods(!foods)}>Foods</button>
                            <button onClick={() => showOrders(!orders)}>Order</button>
                        </div>}

                    {user?.role !== 'admin' && (
                        <div className="flex gap-2 self-end p-3">
                            <button className="font-bold">Welcome, {user?.name}</button>
                            <button onClick={() => showOrders(!orders)}>Orders</button>
                            <button onClick={logout} className="flex gap-2 items-center">
                              Logout <BiSolidLogOut color="red" size={30}/>
                            </button>
                        </div>

                    )}

                </div>
            </div>


            {/* Main foods components */}
            <h3 className="p-3 text-md md:text-2xl">Browse your favorite foods.</h3>
            <div className="flex items-center  justify-start flex-wrap gap-2  p-4 w-full md:p-10">
                {items?.map((data, idx) => (
                    <Food key={idx} data={data} user={null} makeOrder={makeOrder} />
                ))}
            </div>

            <AnimatePresence>
                {orders && <Order />}
                {foods && <AddNewFood />}
                {activate && <MakeOrder order={item} completeOrder={makeOrder} user={user} close={() => setActivate(false)} />}
                {response.open && <Feedback {...response} setOpen={() => setResponse({ open: false })} />}
            </AnimatePresence>
        </div>
    )
}