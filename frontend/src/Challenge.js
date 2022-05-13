import React, {useState} from 'react';
import DisplayComponent from './DisplayComponent.js';
import BtnComponent from './BtnComponent.js';
import './Challenge.css';
import Challengemodal from './ChallengeModal.js';
import Motion from './Motion.js';

function Challenge(props) {

  const nickName = props.userNickName;
  console.log(nickName); // 콘솔창에서 닉네임 잘 나오는지 확인해보세요!

  const [time, setTime] = useState({s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  //not started = 0
  //started = 1
  //stopped = 2

  const start =() => {
    run();
    setStatus(1);
    setInterv(setInterval(run,1000));
    // <Motion />
  };

  var updatedS = time.s, updatedM = time.m, updatedH= time.h;

  const run =() =>{
    if(updatedM === 60){
      updatedH++;
      updatedM= 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS=0;
    }
    updatedS++;
    return setTime({s:updatedS, m:updatedM, h:updatedH});
  };

  const stop =() => {
   clearInterval(interv);
    setStatus(2);
  };

  const reset =() => {
    clearInterval(interv);
     setStatus(0);
     setTime({s:0, m:0, h:0});
   };

   const resume =() => start();


   //MODAL
   const [openModal,setOpenModal] = useState(false);
   

  return (
    <div className="main-secion">
      <div className="clock-holder">
        <Motion />
        <div className="stopwatch">
          <DisplayComponent time={time}/>
          <BtnComponent setOpenModal={setOpenModal} status ={status} resume={resume} reset={reset} stop={stop} start={start}/>
          {openModal && <Challengemodal closeModal={setOpenModal}/>}
        </div>
      </div>
    </div>
  );
}

export default Challenge;