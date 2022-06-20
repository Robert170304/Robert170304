import React from 'react'

export default function Preview(props) {

  let previewStyles = {
    border: `2px solid ${props.theme === "dark" ? "#5F85DB" : "#111"}`,
    borderRadius: "5px",
    padding: "10px",
    width: '100%',
    height: '-webkit-fill-available',
    backgroundColor: '#fff',
    overflow: 'auto',
  };

  return (
    <div className="previewBox">
      <div className='d-flex justify-content-end align-items-center' style={{width: '100%', padding: '0 10px'}}>
         <button
            type="button"
            onClick={props.handleClosePreview}
            style={{background: 'none', border: 'none'}}
          >
            <span className="material-symbols-outlined" style={{color: "#111"}}>close</span>
          </button>
      </div>
      <div className="container my-2 previewText" style={previewStyles}>
        {props.textValue === "" ? "NO TEXT TO PREVIEW" : props.textValue}
      </div>
    </div>
  )
}
