import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext<any>(null);


const url = "http://localhost:3001/schedules";
export function ContextProvider({ children }: any) {

    interface Data {
        title: string,
        start: string,
        end: string,
        date: string,
        username: string,
        email: string,
        interviewer: string
    }
    const [events, setEvents] = useState<any>([])
    const intervierName = ["Interviewer 1", "Interviewer 2"]
    async function addData(data: Data) {
        try {
            const res = await axios.post(url, data)
            return res
        }
        catch (err) {
            alert(err)
        }
    }

    async function fetchData() {
        try {
            const res = await axios.get(url)
            return res.data
        }
        catch (err) {
            alert(err)
        }
    }
    async function fetchDataById(id: number) {
        try {
            const res = await axios.get(`${url}/${id}`)
            return res.data
        }
        catch (err) {
            alert(err)
        }
    }

    async function fetchevent() {
        try {
            const res = await axios.get(url)
            const filteredData = res.data.map((data: Data) => {
                return ({
                    title: data?.interviewer,
                    start: `${data.date}T${data.start}:00`,
                    end: `${data.date}T${data.end}:00`,
                })
            })


            setEvents(filteredData)
        }
        catch (err) {
            alert(err)
        }
    }

   
    async function deleteData(id: number) {
        try {
            const res = await axios.delete(`${url}/${id}`)
            return res.data
        }
        catch (err) {
            alert(err)
        }
    }
    async function updateData(id: number, data: Data) {
        try {
            const res = await axios.patch(`${url}/${id}`, data)
            return res
        }
        catch (err) {
            alert(err)
        }
    }

    function getAvailableSlots(data:any, start:any, end:any, date:Date){
        const formatTime = (time:Date) => time.toTimeString().slice(0, 5);
        const unselectedSlots = [];
        const selectedRanges= data.map((interview:any) => [new Date(`${date}T${interview.start}:00`), new Date(`${date}T${interview.end}:00`)])
        .sort((a:any, b:any) => a[0] - b[0])
        let currentStart = start;
        selectedRanges.forEach(([selectedStart, selectedEnd]: [Date, Date]) => {
            if (selectedStart > currentStart) {
                unselectedSlots.push(`${formatTime(currentStart)} - ${formatTime(selectedStart)}`);
            }
            currentStart = selectedEnd;
        });
    
        if (currentStart < end) {
            unselectedSlots.push(`${formatTime(currentStart)} - ${formatTime(end)}`);
        }
    
        return unselectedSlots;
    }
    return (
        <DataContext.Provider value={{ events, addData, fetchData, deleteData, updateData, fetchevent, fetchDataById, intervierName, url, getAvailableSlots }}>
            {children}
        </DataContext.Provider>
    )
}

