import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";
import { insertData, createNewUser, searchQuery } from "../fb/function";
import { Feedback } from "../components/Motion";


export default function Register() {
    const [info, setInfo] = useState({ email: "", password: "", name: "", phone: "" });
    const [response, setResponse] = useState({});
    const [spin, setSpin] = useState(false)


    const navigate = useNavigate();

    const setField = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const createUser = async (e) => {
        e.preventDefault();
        setSpin(true);

        let temp = []
        searchQuery({
            path: '/users/',
            searchString: info.email,
            type: "email",
            getData: (data) => temp = data
        })

        try {
            // check if user exists. 
            if (temp.length > 0) {
                setResponse({ open: true, type: 'error', message: "User already exists" })
                return
            }

            delete info.password
            await insertData({
                path: "users/",
                docID: new Date().getTime().toString(),
                data: { ...info, role: "user" },
                setResponse: setResponse,
            }).then(() => {
                createNewUser({ ...info }).then(() => {
                    setResponse({ open: true, type: 'success', message: "User created successfully. You can now login" })
                    setSpin(false)
                    setTimeout(() => {
                        localStorage.setItem("user", JSON.stringify({...info, role:"role"}));
                        navigate("/");
                    }, 2000)

                })

            })

        } catch (e) {
            setSpin(false)
        }


    }


    return (
        <div className="flex h-screen relative w-full items-center justify-center">
            <div className="hidden md:flex flex-1 bg-login bg-cover bg-white h-screen"></div>
            <form
                onSubmit={createUser}
                className="flex flex-col items-center w-full md:w-1/3 gap-4 p-5 md:p-20"
            >
                <div className="flex items-center justify-center flex-col">
                    <div className="w-40 h-40 bg-gray-400 rounded-full mb-10"></div>
                    <h2 className="text-3xl text-center">TUTAG Club House</h2>
                    <p className="text-center">Register to Continue </p>
                </div>

                <input
                    type="text"
                    name="name"
                    required
                    onChange={setField}
                    placeholder="Your name"
                    id="name"
                    className="p-3 w-full bg-gray-100 border outline-none invalid:text-red-500 valid:text-green-500"
                />

                <input
                    type="email"
                    required
                    name="email"
                    onChange={setField}
                    placeholder="Email Address"
                    id="email"
                    className="p-3 w-full bg-gray-100 border outline-none invalid:text-red-500 valid:text-green-500"
                />
                <input
                    type="tel"
                    required
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    onChange={setField}
                    placeholder="Phone Number"
                    id="phone"
                    className="p-3 w-full bg-gray-100 border outline-none invalid:text-red-500 valid:text-green-500"
                />

                <input
                    type="password"
                    required
                    onChange={setField}
                    name="password"
                    placeholder="*****"
                    id="password"
                    className="p-3 w-full bg-gray-100 border outline-none"
                />
                <button
                    type="submit"
                    disabled={spin}
                    className="transition-all hover:rounded-md duration-750 p-3 bg-blue-400 hover:bg-blue-700 text-white w-full"
                >
                    {spin ? <ImSpinner className="animate-spin" size={12} /> : "Sign Up"}
                </button>
                <div className="flex w-full justify-between items-center">
                    <Link to="/login" className="text-sm">
                        Have an account? Login
                    </Link>
                </div>
            </form>
            {response.open && <Feedback {...response} setOpen={() => setResponse({ open: false })} />}

        </div>

    );
}
