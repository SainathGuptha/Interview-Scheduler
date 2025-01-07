import { useContext, useEffect, useState }  from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { DataContext } from './context';

export default function Resheduler() {
const {fetchDataById, updateData} = useContext(DataContext)
const {state}= useLocation()
const [details, setDetails] = useState<{ username: string, email: string, title: string, date: string, start: string, end: string }>({ username: "", email: "", title: "", date: "", start: "", end: "" })
const navigate=useNavigate()


useEffect(()=>{
    fetchDataById(state).then((data:any)=>{
        setDetails(data)
    })
},[])
const handleChange = (e: any) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })
}
const handleSubmit = async (e: any) => {
    e.preventDefault()
    updateData(state, details)
    alert("Interview Rescheduled Successfully")
    navigate('/')
}
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Schedule Interview</h2>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name of the Candidate</label>
            <input type='text' disabled name="username" id="username" value={details.username} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type='email' disabled name="email" id="email" value={details.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type='text' disabled name="title" id="title" value={details.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type='date' name="date" id="date" value={details.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Time</label>
            <input type="time" name="start" id="start" value={details.start} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Time</label>
            <input type="time" name="end" id="end" value={details.end} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type='submit' className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Schedule Interview</button>
    </form>
</div>
</>
  )
}
