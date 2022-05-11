import React from 'react'

function Challengemodal(){

    return <div className="modalBackground">
        <div className="modalContainer">
            <button> X </button>
            <div className='title'>
                <h3>닉네임님의 총 공부시간</h3>
                <h1>12:28:47</h1>
            </div>
            <div className='body'>
            <h2>공부일기를 작성하시겠어요?</h2>
            </div>
            <div className='footer'>
                <button>작성하기</button>
                <button>메인으로</button>
            </div>
        </div>
    </div>
}

export default Challengemodal