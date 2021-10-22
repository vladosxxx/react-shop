import ReactDOM from 'react-dom'
const { createPortal } = ReactDOM
const Modal = ({ children, onClose, open }) =>
  open
    ? createPortal(
        <div>
          <button onClick={onClose} className="modal__close">
            &times;
          </button>
          {children}
        </div>,
        document.body
      )
    : null
export default Modal
