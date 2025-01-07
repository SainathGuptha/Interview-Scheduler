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
    }
    const [events, setEvents] = useState<any>([])
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
                    title: data.title,
                    start: `${data.date}T${data.start}:00`,
                    end: `${data.date}T${data.end}:00`,
                })
            })
            console.log(filteredData);

            setEvents(filteredData)
        }
        catch (err) {
            alert(err)
        }
    }
    async function deleteData(id: number) {
        try {
            const res = await axios.delete(`${url}/${id}`)
            // alert("Interview Cancelled")
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
    return (
        <DataContext.Provider value={{ events, addData, fetchData, deleteData, updateData, fetchevent , fetchDataById}}>
            {children}
        </DataContext.Provider>
    )
}