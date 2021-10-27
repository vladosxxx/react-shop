import React from 'react'
import ReactDOM from 'react-dom'
import '../style/cart.css'

const { createPortal } = ReactDOM
const ModalCart = ({ children, onClose, openCart }) =>
  openCart
    ? createPortal(
        <div className="modal-cart">
          <button onClick={onClose} className="modal__close">
            &times;
          </button>
          {children}
        </div>,
        document.body
      )
    : null
export default ModalCart
