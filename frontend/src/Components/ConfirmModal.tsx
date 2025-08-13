import React, { useEffect, useRef } from "react";

type Props = { id: string; title: string; body: string; onConfirm: () => void; };
const ConfirmModal: React.FC<Props> = ({ id, title, body, onConfirm }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { /* rien, modal géré par bootstrap JS via data-attrs */ }, []);
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div className="modal-body"><p className="mb-0">{body}</p></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
