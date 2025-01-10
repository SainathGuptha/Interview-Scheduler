import { useContext, useEffect, useState } from 'react';
import { DataContext } from './context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Sheduler() {
    const { url, addData , intervierName, getAvailableSlots} = useContext(DataContext)
    const [details, setDetails] = useState<{ username: string, email: string, title: string, date: string, start: string, end: string, interviewer: string }>({ username: "", email: "", title: "", date: "", start: "", end: "", interviewer: "" })
    const navigate = useNavigate()
    const [slots, setSlots] = useState<any>([])
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setDetails({ ...details, [name]: value })
    }

    useEffect(()=>{
        if(details.interviewer && details.date){
            axios.get(`${url}?interviewer=${details.interviewer}&date=${details.date}`).then((data:any)=>{
                const start= new Date(`${details.date}T10:00:00`)
                const end= new Date(`${details.date}T18:00:00`)
                const slots= getAvailableSlots(data.data,start,end,details.date)
                setSlots(slots)
                })
        }
    },[details])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const fetchbyDate= await axios.get(`${url}?interviewer=${details.interviewer}&date=${details.date}`)
        const isOverlap=fetchbyDate.data.map((data:any)=>{
            const start = new Date(`${data.date}T${data.start}:00`);
            const end = new Date(`${data.date}T${data.end}:00`);
            const check = new Date(`${details.date}T${details.start}:00`);
            return check > start && check < end;
        })
        if (isOverlap.includes(true)) {
            alert(` ${details.interviewer} has an overlapping meeting.`)
        } 
        else {
            addData(details)
            alert("Interview scheduled successfully")
            setDetails({ username: "", email: "", title: "", date: "", start: "", end: "", interviewer: "" })
            navigate("/")
        }
    }

    return (
        <div  className="flex min-h-screen bg-gray-100">
         <div className="w-1/4 p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Available Slots</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {slots && slots.length > 0 ? (
                        slots.map((slot: any, index: number) => (
                            <div key={index} className="mb-2">
                                <p className="text-gray-700">{slot}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700"> Available For Entire Day</p>
                    )}
                </div>
            </div>
            <div className="w-3/4 flex justify-center items-center p-8">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Schedule Interview</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name of the Candidate</label>
                        <input type='text' name="username" id="username" value={details.username} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type='email' name="email" id="email" value={details.email} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type='text' name="title" id="title" value={details.title} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700">Interviewer</label>
                        <select name="interviewer" id="interviewer" value={details.interviewer} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                            <option value="">Select Interviewer</option>
                            {intervierName.map((data:any)=>(
                                <option value={data}>{data}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type='date' name="date" id="date" value={details.date} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input type="time" name="start" id="start" value={details.start} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min={"10:00"} max={"18:00"} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Time</label>
                        <input type="time" name="end" id="end" value={details.end} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min={details.start>"10:00"?details.start:"10:00" } max={"18:00"} required />
                    </div>
                  
                    <button type='submit' className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Schedule Interview</button>
                </form>
            </div>
        </div>
    );
}