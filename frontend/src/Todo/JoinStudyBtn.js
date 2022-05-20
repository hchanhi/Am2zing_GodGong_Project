import React, {useState} from "react";
import TodoModal from './TodoModal.js';
import Button from '@mui/material/Button';

function JoinStudyBtn({task}) {

    let [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                onClick={() => setModalOpen(true)}>
                {
                    task == 'onlyMake'
                        ? 'Todo만들기'
                        : '참여하기'
                }
            </Button>
            {
                modalOpen && <TodoModal
                    task={task}
                    open={modalOpen}
                    setOpen={setModalOpen}/>
            }
        </div>
    );
}

export default JoinStudyBtn;