import { useSelector } from "react-redux";
import CardMeeting from "../components/CardMeeting";

export default function HomeLoggedIn(){

    const currentUser = useSelector((state) => state.auth.user);

    const data = {upLeft: '01/01/2024', upRight: '3 PM', down: 'Life coaching', id: 1}
    
    const invoice = {paid: true, amount: '100'}

    return(
        <div className="w-full py-4 px-4 lg:px-64">
            <h1 className="text-4xl">Hello {currentUser.first_name}</h1>

            <div className="mt-3 flex justify-between items-center w-full rounded-lg bg-green p-3 text-white">
                <p className="font-bold">Schedule a meeting</p>
                <i className="text-2xl fa-solid fa-circle-arrow-right"></i>
            </div>

            <div className="mt-5 flex justify-between items-center w-full rounded-lg bg-gray-300 p-3">
                <p className="font-bold">Get in touch</p>
                <i className="text-2xl fa-solid fa-message"></i>
            </div>

            <div className="mt-5">
                <h2 className="text-2xl">Your next appointments</h2>
                <div>
                    <CardMeeting data={data} />
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-2xl">Your Invoices</h2>
                <div>
                    <div className="border-2 border-black p-2 flex justify-between rounded-lg">
                        {invoice.paid ? <p className="font-bold text-green">Paid</p> : <p className="font-bold text-red-500">Due</p>}
                        <div className="flex items-center">
                        <p>Amount: {invoice.amount}$</p>
                        <i className="fa-solid fa-circle-arrow-down text-blue-500 text-xl ml-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}