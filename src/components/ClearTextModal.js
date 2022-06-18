import React from 'react'

export default function ClearTextModal(props) {

    function handleCloseBtn() {
        props.setShowClearTextModal(false)
    }

  return (<div className="modal" id="staticBackdrop" 
  data-bs-backdrop="static" data-bs-keyboard="false" 
  tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" 
  style={{display: props.clearTextModal ? 'block' : 'none', background: props.clearTextModal ? 'rgba(0,0,0,.8)' : ''}}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <span className="material-symbols-outlined" style={{color: 'red'}}>warning</span>
        <h5 className="modal-title">Alert</h5>
        <button type="button" className="btn-close btn-sm" onClick={handleCloseBtn} data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>All your work in textarea will be clear!</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseBtn} data-bs-dismiss="modal">Don't!</button>
        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        title="Clear all." onClick={props.clearTextFunc}>Do it!</button>
      </div>
    </div>
  </div>
</div>
  )
}
