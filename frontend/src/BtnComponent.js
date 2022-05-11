import React from 'react';

function BtnComponent(props) {
  return (
    <div>
      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-gre"
        onClick={props.start}>시작</button> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red"
                  onClick={props.stop}>일시정지</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={() => {props.reset(); props.setOpenModal(true);}}>완료</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre"
                  onClick={props.resume}>이어서하기</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={() => {props.reset(); props.setOpenModal(true);}}>완료</button>
        </div> : ""
      }
     
    </div>
  );
}

export default BtnComponent;