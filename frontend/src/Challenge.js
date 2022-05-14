import React, { useState } from 'react';
import DisplayComponent from './DisplayComponent.js';
import BtnComponent from './BtnComponent.js';
import './Challenge.css';
import { isAuth, getNickName } from './jwtCheck';
import ChallengeModal from './Challengemodal.js';
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

function Challenge(props) {

  // const token = JSON.parse(localStorage.getItem('accessToken'));
  // let nickname = getNickName(token);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  //not started = 0
  //started = 1
  //stopped = 2

  const start = () => {
    init();
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };

  var updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ s: 0, m: 0, h: 0 });
  };

  const resume = () => start();


  //MODAL
  const [openModal, setOpenModal] = useState(false);


  return (
    <div className="main-secion">
      <div className="clock-holder">
        <div className="clock-title1">Ama2zing 님의 오늘의 챌린지(버튼수정예정)</div>
        <div className="stopwatch">
          {openModal && <ChallengeModal closeModal={setOpenModal} />}
          <DisplayComponent className="DisplayComponent" time={time} />
          <BtnComponent setOpenModal={setOpenModal} status={status} resume={resume} reset={reset} stop={stop} start={start} />
          <div><canvas id="canvas"></canvas></div>
          <div id="label-container"></div>
        </div>
      </div>
    </div>
  );
}

const URL = "https://teachablemachine.withgoogle.com/models/pUdkMsW7A/";
let model, webcam, ctx, labelContainer, maxPredictions = null;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 200;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop); //

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");

  //퍼센트 화면표시1
  // labelContainer = document.getElementById("label-container");
  // for (let i = 0; i < maxPredictions; i++) { // and class labels
  //     labelContainer.appendChild(document.createElement("div"));
  // }
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  //콘솔로 확인하는 코드
  console.log(prediction[0].probability);
  if (prediction[0].probability > 0.001) {
    console.log('공부중');
  } else {
    console.log('자리비움');
    //시간이멈추게하는 코드 입력하기
  }

  //퍼센트 화면표시2
  // for (let i = 0; i < maxPredictions; i++) {
  //     const classPrediction =
  //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //     labelContainer.childNodes[i].innerHTML = classPrediction;
  // }

  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);

    // 포인트 뼈대 표시
    // if (pose) {
    //     const minPartConfidence = 0.5;
    //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
    //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    // }
  }
}

export default Challenge;