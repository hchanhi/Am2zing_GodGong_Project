import { border } from "@mui/system";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import axios from 'axios';


function DiaryCom({ diaryId, diaryContent, diarySentiment, diaryCreated }) {


    const handleSubmit = (diaryId) => {

        axios
            .get('/api/diary/delete/' + diaryId, { params: { diaryId: diaryId } })
            .then(function (response) {
                console.log(response.status, '성공');





            })
            .catch(function (err) {
                console.log(err);
                console.log(err.response.data.message);
                if (err.response.status === 400) {
                    alert(err.response.data.message);
                }


            });

    };





    return <div>

        <div >
            <h2>{diaryId}</h2>
            <h5>{diaryCreated}</h5>
            <br></br>
            <h5 >
                <Link to={`/`}>{diaryContent}</Link>

            </h5>
            <br></br>
            {diarySentiment === 'neutral' ?
                <h5 >감정분석결과  : 기분이 보통입니다. 😐</h5> :
                diarySentiment === 'negative' ?
                    <h5 >감정분석결과 : 기분이 나쁩니다. 👿</h5>
                    : <h5 >감정분석결과 : 기분이 좋습니다. 🥰</h5>
            }
            <button type="submit" >수정</button>
            <button type="submit" onClick={() => handleSubmit(diaryId)}>삭제</button>
            <br></br>
            <hr></hr>
            <br></br>



        </div>
    </div >;
}

DiaryCom.propTypes = {
    diaryId: PropTypes.number.isRequired,
    diaryContent: PropTypes.string.isRequired,
    diarySentiment: PropTypes.string.isRequired,
    diaryCreated: PropTypes.string.isRequired,


};
// <Link to={`/Movie/${diaryId}`}>
export default DiaryCom;