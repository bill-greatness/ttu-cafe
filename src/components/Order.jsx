import { Motion } from "./Motion";
import { BiTrash } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

export default function Order() {
    return (
        <Motion>
            <div className="w-2/3 p-3 bg-white">
                <h3 className="text-2xl py-3  uppercase">List of Orders Made</h3>
                <table className="table-auto min-h-96 w-full  bg-gray-50">
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
                        {[1, 2, 3, 4, 5].map(info => (
                            <tr className="border-b border-b-gray-300">
                                <td className="p-3">123</td>
                                <td className="p-3">Coffee</td>
                                <td className="p-3">2</td>
                                <td className="p-3">$5</td>
                                <td className="p-3">$10</td>
                                <td className="p-3">2022-01-01</td>
                                <td className="p-3 flex gap-2">
                                    <FaRegEdit color="green" size={25} className="cursor-pointer"/>
                                    <BiTrash color='red' size={25} className="cursor-pointer"/>
                                </td>
                            </tr>
                        ))}


                    </tbody>

                </table>
            </div>
        </Motion>
    )

}