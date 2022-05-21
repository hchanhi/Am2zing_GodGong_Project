import { useState } from 'react';
import Calendar from 'react-calendar';
import {getNickName } from './jwtCheck';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import './TimeCalendar.css';

function TimeCalendar() {
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const nickname = getNickName(token);
  const [MyTime, setMyTime] = useState([]);
  const [date, setDate] = useState(new Date());

  let body = {
    nickname : nickname
};

const getMyTime = async () => {
    const json = await axios.post('/api/mypage/studytime', body);
    if (json.data == null) {
    } else {
        setMyTime(json.data);
    }
};

function test(data){
  var h = parseInt(data/3600);
  var m = parseInt((data%3600)/60);
  var s = (data%3600)%60;
  var time = h+"시간 "+m+"분 "+s+"초";
  return time;
};






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
          <h2>오늘의 공부시간</h2>
          <div className="studytimeToday"><h1>{test(MyTime[0])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(MyTime[0])}</h1></div>

          <h2>이번주 공부시간</h2>
          <div className="studytimeWeek"><h1>{test(MyTime[1])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(MyTime[1])}</h1></div>

          <h2>이번달 공부시간</h2>
          <div className="studytimeMonth"><h1>{test(MyTime[2])=="NaN시간 NaN분 NaN초" ? "0시간 0분 0초":test(MyTime[2])}</h1></div>
        </div>
      </div>

    </div>
  );
}

export default TimeCalendar;