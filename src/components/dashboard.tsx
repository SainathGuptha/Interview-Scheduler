import { useContext, useEffect, useState } from 'react'
import { DataContext } from './context'
import { useNavigate } from 'react-router-dom'
import Calendar from './calender'
export default function Dashboard() {
    const { fetchData, deleteData } = useContext(DataContext)
    const navigate = useNavigate()
    const [interview, setInterviews] = useState<any>([])


    useEffect(() => {
        fetchData().then((data: any) => {
            setInterviews(data)
        });
    }, [])

    const handleDelete = (id: any) => {
        deleteData(id).then((data:any) => {
            setInterviews(interview.filter((item: any) => item.id !== data.id))
        });
    }
     
    function toFilter(value:string){
        if(value){
            fetchData().then((data: any) => {
                const filter=data.filter((data:any)=>data.username.toLowerCase().includes(value.toLowerCase()) || data.date.includes(value) || data.interviewer.toLowerCase().includes(value.toLowerCase())) 
                setInterviews(filter)
            });
        }else{
            fetchData().then((data: any) => {
                setInterviews(data)
            });
        }
     }

    return (
        <>
        <div className='flex flex-row h-screen'>
            <div className='w-1/3 overflow-y-auto  '>
            <div className='sticky top-0 bg-white z-10 p-4'>
                    <div className='flex justify-center mb-4'>
                        <button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600' onClick={()=>navigate("/sheduler")}>Schedule Interview</button>
                    </div>
                    <div className='flex space-x-2'>
                        <input 
                            type='text' 
                            placeholder='Search by Candidate Name' 
                            onChange={(e) => toFilter(e.target.value)} 
                            className='w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs'
                        />
                        <input 
                            type='date' 
                            onChange={(e) => toFilter(e.target.value)} 
                            className='w-1/3 px-1 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                    </div>
                </div>
                {interview?.map((data: any) => (
                    <div key={data.id} className='flex flex-col p-4 border rounded-lg shadow-md mb-4'>
                        <h6 className='text-lg font-bold mb-2'>{data?.title}</h6>
                        <p className='text-sm text-gray-600 mb-1'><strong>Name:</strong> {data?.username}</p>
                        <p className='text-sm text-gray-600 mb-1'><strong>Interviewer:</strong> {data?.interviewer}</p>
                        <p className='text-sm text-gray-600'><strong>Date:</strong> {data?.date} <strong> Time:</strong> {data?.start} - {data?.end}</p>
                        <div className='flex space-x-4 mt-4'>
                            <button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={()=>handleDelete(data.id)}>Cancel</button>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' onClick={()=>navigate(`/resheduler`,{state:data.id})}>Update</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-2/3 h-full'>
                <Calendar/>
            </div>
        </div>
        </>
    )
}
