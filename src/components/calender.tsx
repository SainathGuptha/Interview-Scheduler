import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DataContext } from './context'
import { useContext, useEffect } from 'react'



export default function Calendar() {

  const {events, fetchevent}= useContext(DataContext)
  useEffect(()=>{
    fetchevent() 
  },[])

  return (
      <div className="w-full ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={events}
        />
      </div>
  )
}


