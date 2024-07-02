import { useState } from "react"
import { Motion, Feedback, Spin } from "./Motion"
import { uploadFiles, insertData } from "../fb/function"
import {PaystackButton} from 'react-paystack'
import { config } from "./configs"

export const Food = ({ data, user, makeOrder }) => {
    return (
        <div className="w-1/6  bg-red-400 shadow-md h-80 shrink-0 rounded-md hover:p-0 transition-all duration-100">
            <img className="w-full h-60 object-cover cursor-pointer" onClick={() => makeOrder(data)} src={data?.photos[0]}></img>
            <div className="flex flex-col p-2">
                <p className="text-xl font-normal text-white">{data?.name}</p>
                <p className="font-bold text-3xl">¢{data?.price}</p>
            </div>
            {/* display edit and delete button if admin */}
            {user?.role === "admin" && <div className="flex items-center justify-between">
                <button>Edit</button>
                <button>Delete</button>
            </div>}
        </div>
    )
}

export const AddNewFood = () => {

    const [data, setData] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        photos: []
    })

    const [response, setResponse] = useState({ open: false, type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const setField = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const uploadPhoto = (e) => {
        setUploading(false)
        uploadFiles({
            path: "/foods",
            files: e.target.files,
            setData: setData,
            setUploading: setUploading
        })
    }

    const addFood = (e) => {
        e.preventDefault()
        setLoading(true)
        // upload to firestore...
        insertData({
            path: "/foods",
            docID: new Date().getTime().toString(),
            data,
            setResponse: setResponse,
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <Motion>
            <div className="w-1/2 h-auto shrink-0 bg-white">
                <form onSubmit={addFood} className="flex flex-col gap-3 p-10">
                    <h3 className="text-2xl py-3">Add New Food</h3>
                    <input className="p-3 bg-gray-100 outline-none" type="text" name="name" required onChange={setField} placeholder="Enter Food Name" />
                    <div className="w-full flex gap-2 items-center">
                        <div className="w-1/2">
                            <select onChange={setField} className="p-3 w-full outline-none bg-gray-100" required name="category" id="category">
                                <option value="">Select Category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Supper">Supper</option>
                                <option value="Others">Other</option>
                                {/* Populate categories from firestore */}
                            </select>
                        </div>

                        <input className="p-3 w-1/2 outline-none bg-gray-100" type="number" required onChange={setField} name="price" step="0.01" placeholder="Enter Price" />
                    </div>
                    <textarea className="p-3 bg-gray-100 outline-none resize-none" name="description" required onChange={setField} placeholder="Enter Description" rows={5} />
                    {/* Show photo here when uploaded... */}
                    {data?.photos.length > 0 &&
                        <div className="flex flex-wrap gap-2 items-center">
                            {data?.photos.map(ind => (
                                <img key={ind} className="w-40 h-40 object-cover" src={ind}></img>
                            ))}
                        </div>
                    }
                    {/* End of photos */}
                    <label htmlFor="photo" className="p-2 bg-gray-500 cursor-pointer w-fit text-white">
                        {uploading ? <Spin /> : "Attach Photo"}
                    </label>
                    <input type="file" multiple onChange={uploadPhoto} required name="photo" id="photo" className="hidden" />
                    <button type="submit" className="p-3 bg-orange-500 text-white mt-4 font-normal">
                        {loading ? <Spin /> : "Upload Food"}
                    </button>
                </form>
            </div>
            {response.open && <Feedback {...response} setOpen={() => setResponse({ open: false })} />}
        </Motion>
    )
}

export const MakeOrder = ({ order, user  }) => {


    const [quantity, setQuantity] = useState(1);
    const price = Number(parseFloat(order.price) * quantity).toFixed(2)

    const payProps = {
        ...config(user?.email, price),
        text: `Make Order ¢${price}`,
        onSuccess: (reference) => console.log(reference),
        onClose: () => alert("closed"),
      }

      
    return (
        <div className="w-1/4 fixed right-0 top-0 bg-gray-50 h-screen">
            <div className="flex flex-col gap-3 p-10">
                <h3 className="text-2xl py-3">Make Order</h3> 
                {/* Display order details */}
                 <img className="w-80 h-80 object-cover" alt={order?.name} src={order?.photos[0]}/> 
                 <div>
                    <h1 className="text-3xl">{order?.name}</h1>    
                    <p className="text-md">{order.description}</p>
                </div>   
                {/* Display selected food items and price */}
                <div className="flex flex-col">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" className="p-3 w-fit outline-none" name="quantity" id="quantity" min={1} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                </div>
                <PaystackButton
                className="bg-orange-500 p-3 text-white"
                    {...payProps}
                />
                {/* <button disabled={quantity < 1} className="p-3 text-xl bg-black text-white font-normal">Place Order ¢{price}</button> */}
            </div>
        </div>
    )
}