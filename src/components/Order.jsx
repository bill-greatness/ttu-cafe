import { useEffect, useState } from "react";
import { Feedback, Motion } from "./Motion";
import { BiTrash } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { deleteDocument, readDocuments } from "../fb/function";

export default function Order() {
    const [orders, setOrders] = useState([])
    const [response, setResponse] = useState({open:false, type:'', message:''})
    useEffect(() => {
        readDocuments({
            path:"orders",
            getData:setOrders
        })
    },[])

    const userOrders = () => {
        const user = JSON.parse(localStorage.getItem('user'))
       user?.role === "admin" ? orders : orders.filter(order => order.user === user.uid)
    }
    return (
        <Motion>
            <div className="w-2/3 p-3 bg-white">
                <h3 className="text-2xl py-3  uppercase">List of Orders Made</h3>

               {orders.length > 0 && <table className="table-auto min-h-96 w-full  bg-gray-50">
                    <thead>
                        <tr className="text-left bg-black text-white">
                            <th className="p-3 uppercase font-medium">Order ID</th>
                            <th className="p-3 uppercase font-medium">Product</th>
                            <th className="p-3 uppercase font-medium">Quantity</th>
                            <th className="p-3 uppercase font-medium">Price</th>
                            <th className="p-3 uppercase font-medium">Total</th>
                            <th className="p-3 uppercase font-medium">Date</th>
                            <th className="p-3 uppercase font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userOrders()?.map((order, index) => (
                            <tr key={index + "_order"} className="border-b border-b-gray-300">
                                <td className="p-3">#{index}</td>
                                <td className="p-3">{order.name}</td>
                                <td className="p-3">{order?.quantity}</td>
                                <td className="p-3">¢{order?.price}</td>
                                <td className="p-3">¢{order?.totalPrice}</td>
                                <td className="p-3">{order?.date}</td>
                                <td className="p-3 flex gap-2">
                                    <FaRegEdit color="green" size={25} className="cursor-pointer"/>
                                    <BiTrash onClick={() => deleteDocument({
                                        path:"/orders", 
                                        id: order.id, 
                                        setResponse
                                    })} color='red' size={25} className="cursor-pointer"/>
                                </td>
                            </tr>
                        ))}


                    </tbody>

                </table>}
            </div>
            {response.open && <Feedback {...response} setOpen={() => setResponse({open:false})}/>}
        </Motion>
    )

}