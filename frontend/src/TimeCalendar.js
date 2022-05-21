import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import './TimeCalendar.css';

function TimeCalendar() {
  const [date, setDate] = useState(new Date());







  return (
    <div className='page'>
      <div className='timeCalendar'>
        <h2 className='text-center'>나의 공부시간⏰</h2>
        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className='clickedDate'>
          {date.toDateString()}
        </p>
      </div>

      <div className='totaltime'>
        <div className='totaltime2'>
          <h1>오늘의 공부시간</h1>
          

          <h1>이번주 공부시간</h1>


          <h1>이번달 공부시간</h1>

        </div>
      </div>

    </div>
  );
}

export default TimeCalendar;