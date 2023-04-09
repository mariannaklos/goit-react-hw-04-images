import React ,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modals,Overlay } from './modal.style';

export const Modal = ({src, closeModal})=> {

  useEffect(()=>{
        window.addEventListener('keydown', onCloseModalByEsc);
      })


  const  onCloseModalByEsc = (e) => {
        if(e.code === 'Escape'){
          closeModals()
        }
      }

  const closeModals = ()=>{
        closeModal()
    }

    return (
        <Overlay onClick={closeModal}>
        <Modals>
          <img src={src} alt="ads" width='600'/>
        </Modals>
      </Overlay>
    );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
};