import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import MakeTodo from './MakeTodo.js';
import CompleteTodo from './CompleteTodo.js';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 30px 30px 40px;
  text-align: left;
`

function Modal({ task, open, setOpen }) {

  return (
    <div>
      <ModalOverlay open={open} />
      <ModalWrapper open={open}>
        <ModalInner>
          <CloseIcon onClick={() => setOpen(false)} sx={{ float: 'right', cursor: 'pointer' }} /><br />
          {
            task == 'onlyMake' || task == 'join'
              ? <MakeTodo setOpen={setOpen} task={task} />
              : <CompleteTodo task={task} />
          }
        </ModalInner>
      </ModalWrapper>
    </div>
  )
}

export default Modal