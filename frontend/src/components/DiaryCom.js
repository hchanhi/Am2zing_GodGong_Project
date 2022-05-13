import PropTypes from "prop-types";
import { Link } from "react-router-dom";




function DiaryCom({ diaryId, diaryContent, diarySentiment, diaryCreated }) {
    return <div>

        <div>
            <h2 >
                <Link to={`/`}>{diaryContent}</Link>
            </h2>
            <h5 >{diarySentiment}</h5>
            <h5 >{diaryCreated}</h5>


        </div>
    </div>;
}

DiaryCom.propTypes = {
    diaryId: PropTypes.number.isRequired,
    diaryContent: PropTypes.string.isRequired,
    diarySentiment: PropTypes.string.isRequired,
    diaryCreated: PropTypes.string.isRequired,


};
// <Link to={`/Movie/${diaryId}`}>
export default DiaryCom;