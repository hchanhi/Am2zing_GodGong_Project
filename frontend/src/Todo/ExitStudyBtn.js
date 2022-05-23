import React, { useState } from "react";
import TodoModal from './TodoModal.js';
import Button from '@mui/material/Button';

function ExitStudyBtn() {

    let [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                style={{ backgroundColor: ' #fd565f ' }}
                onClick={() => setModalOpen(true)}>
                퇴장
            </Button>
            {
                modalOpen && <TodoModal
                    task='exit'
                    open={modalOpen}
                    setOpen={setModalOpen} />
            }
        </div>
    );
}

export default ExitStudyBtn;
