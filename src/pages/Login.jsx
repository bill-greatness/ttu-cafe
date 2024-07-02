import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner } from "react-icons/im";
import { signIn } from "../fb/function";
import { Feedback } from "../components/Motion";


export default function Login() {
    const [info, setInfo] = useState({ email: "", password: "" });
    const [response, setResponse] = useState({});
    const [spin, setSpin] = useState(false);
    const [show, setShow] = useState(false)
    const [codes, setCode] = useState({})

    const firstRef = useRef()
    const secondRef = useRef()
    const thirdRef = useRef()
    const fourthRef = useRef()
    const verifyRef = useRef()

    const [verified, setVerified] = useState(false);

    const navigate = useNavigate();


    const verify2FA = () => {
        // verify code...
        const code = localStorage.getItem("code");
        const { code1, code2, code3, code4 } = codes

        const userCode = `${code1}${code2}${code3}${code4}`

        if (code === userCode) {
            setVerified(true);

        } else {
            alert("Invalid Code");
            return
        }
    };

    const setField = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const loginToApp = async (e) => {
        e.preventDefault();
        setSpin(true);

        signIn({ ...info }).then(user => {
            // navigate to dashboard page
            // send verificaton code...
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        }).catch(err => {
            setResponse({open:true, type:'error', message:err.message});
        }).finally(() => setSpin(false))

    }

    const changeRef = (e, next) => {
        setCode(prev => ({ ...prev, [e.target.name]: e.target.value }));
        next.current.focus()
    }

    return (
        <div className="flex h-screen relative w-full items-center justify-center">
            <div className="hidden md:flex flex-1 bg-login bg-cover bg-white h-screen"></div>
            <form
                onSubmit={loginToApp}
                className="flex flex-col items-center w-full md:w-1/3 gap-4 p-5 md:p-20"
            >
                <div>
                    <div className="w-40 h-40 bg-gray-400 rounded-full mb-10"></div>
                    <h2 className="text-3xl text-center">TTU Cafe</h2>
                </div>

                <input
                    type="email"
                    name="email"
                    onChange={setField}
                    placeholder="Email Address"
                    id="email"
                    className="p-3 w-full bg-gray-100 border outline-none invalid:text-red-500 valid:text-green-500"
                />
                <input
                    type="password"
                    onChange={setField}
                    name="password"
                    placeholder="*****"
                    id="password"
                    className="p-3 w-full bg-gray-100 border outline-none"
                />
                <button
                    type="submit"
                    className="transition-all hover:rounded-md duration-750 p-3 bg-red-500 text-white w-full"
                >
                    {spin ? <ImSpinner className="animate-spin" size={12} /> : "Login"}
                </button>
                <div className="flex w-full justify-between items-center">
                    <Link to="/register" className="text-sm">
                        Create new Account
                    </Link>
                    <Link to="/forgotten-password" className="text-sm">
                        Forgotten Password
                    </Link>
                </div>
            </form>
            {response.open && <Feedback {...response} setOpen={() => setResponse({open:false})} />}

            <AnimatePresence>
                {show && <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", duration: 5 }}

                    className="w-full h-screen fixed top-0 bg-gray-200/100 backdrop-blur-md flex items-center justify-center">
                    <form action="#" className="bg-white h-60 flex rounded-md shadow-sm flex-col gap-3 p-10">
                        <h1 className="text-xl p-2 text-center">Enter Verification Code...</h1>
                        <div className="flex gap-2 items-center">
                            <input type="text" name="code1" onChange={(e) => changeRef(e, secondRef)} ref={firstRef} className="p-3 w-16 outline-none bg-gray-200 text-center font-bold" maxLength={1} />
                            <input type="text" ref={secondRef} name="code2" onChange={(e) => changeRef(e, thirdRef)} className="p-3 w-16 outline-none bg-gray-200 text-center font-bold" maxLength={1} />
                            <input type="text" ref={thirdRef} name="code3" onChange={(e) => changeRef(e, fourthRef)} className="p-3 w-16 outline-none bg-gray-200 text-center font-bold" maxLength={1} />
                            <input type="text" ref={fourthRef} name="code4" onChange={(e) => changeRef(e, verifyRef)} className="p-3 w-16 outline-none bg-gray-200 text-center font-bold" maxLength={1} />
                        </div>
                        <button type="button" className="p-2 bg-orange-500 outline-none text-white text-center" onClick={() => verify2FA()} ref={verifyRef}>Verify Code</button>
                    </form>
                </motion.div>}
            </AnimatePresence>
        </div>

    );
}
