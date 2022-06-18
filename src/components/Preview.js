import React from 'react'

export default function Preview(props) {
  return (
    <div className="previewBox">
        <button
            type="button"
            className="btn-close btn-close-white"
            onClick={props.handleClosePreview}
          ></button>
          <div className="container my-2 previewText" style={props.previewStyles}>
            {props.textValue === "" ? "NO TEXT TO PREVIEW" : props.textValue}
          </div>
    </div>
  )
}
