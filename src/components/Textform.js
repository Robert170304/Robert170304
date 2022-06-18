import React from "react";
import ClearTextModal from "./ClearTextModal";
import Preview from "./Preview";

function Textform(props) {
  const [textValue, setTextvalue] = React.useState("Enter your text here...");
  const [showPreview, setShowPreview] = React.useState(false);
  const [activeBold, setActiveBold] = React.useState(true)
  const [activeItalic, setActiveItalic] = React.useState(true)
  const [copyBtn, setcopyBtn] = React.useState({
    textVal: "Copy Text",
    btnColor: "light",
  });
  const [choosedSize, setChoosedSize] = React.useState(16)
  const [showClearTextModal, setShowClearTextModal] = React.useState(false)

  let styles = {
    backgroundColor: props.theme === "dark" ? "#353941" : "",
    color: props.theme === "dark" ? "white" : "",
    transition: "all 0.3s linear",
    borderRadius: "5px",
    marginTop: "100px",
  };

  let previewStyles = {
    border: `2px solid ${props.theme === "dark" ? "#5F85DB" : "#111"}`,
    borderRadius: "5px",
    padding: "10px",
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'auto'
  };

  const [textStyles, setTextStyles] = React.useState({fontSize: 16})

  /*let textValArr = textValue.split(' ')
  React.useEffect(() => {
    textValArr.forEach((text) => {    
      text.addEventListener('dblclick', function(e) {
        console.log(e.target)
      })
    })
  })*/
  let fontSizesArr = []
  for (let i = 8; i <= 14; i=i+6) {
    const el = i;
    fontSizesArr.push(el)
    if(el === 14){
      for (let j = el; j <= 28; j= j+2) {
        const newEl = j
        fontSizesArr.push(newEl)
        if(newEl == 28){
          for (let k = newEl; k <= 36; k=k+8) {
            const newEl2 = k;
            fontSizesArr.push(newEl2)
          }
        }
      }
    }
  }

  const filterSizes = fontSizesArr.filter((size) => size)

  function handleUpClick() {
    setTextvalue((oldText) => {
      return oldText.toUpperCase();
    });
  }
  function handleLowClick() {
    setTextvalue((oldText) => {
      return oldText.toLowerCase();
    });
  }

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleCapitalClick() {
    setTextvalue((oldText) => {
      return capitalizeFirstLetter(oldText)
    })
  } 

  function handleOnChangeTextArea(e) {
    setTextvalue(e.target.value);
  }

  function showcopyBtn() {
    setcopyBtn((oldCopyBtn) => {
      return { ...oldCopyBtn, textVal: "Copied", btnColor: "success" };
    });
    setTimeout(() => {
      setcopyBtn((oldCopyBtn) => {
        return { ...oldCopyBtn, textVal: "Copy Text", btnColor: "light" };
      });
    }, 2000);
  }

  function copyText() {
    navigator.clipboard.writeText(textValue);
    showcopyBtn();
  }

  function handleclearTextModal(e) {
    e.preventDefault()
    setShowClearTextModal(true)
  }

  function clearText() {
    setTextvalue("");
  }

  function handlePreview() {
    setShowPreview(true);
  }

  function handleClosePreview() {
    setShowPreview(false);
  }

  function handleBold() {
    setActiveBold((oldText) => {
      return !oldText;
    });
    setTextStyles((oldStyles) => {
      return {...oldStyles, fontWeight: activeBold ? 'bold' : 'normal'}
    })
  }

  function handleItalic() {
    setActiveItalic((oldText) => {
      return !oldText;
    });
    setTextStyles((oldStyles) => {
      return {...oldStyles, fontStyle: activeItalic ? 'italic' : 'normal'}
    })
  }

  function handleChange(e) {
    setChoosedSize(e.target.value)
  }

  function handleFontSize(e) {
    setTextStyles((oldStyles) => {
      return {...oldStyles, fontSize: parseInt(e.target.textContent)}
    })
  }

  function handleTextAlign(alignVal) {
    setTextStyles((oldStyles) => {
      return {...oldStyles, textAlign: alignVal}
    })
  }

  return (
    <>
      {showClearTextModal && <ClearTextModal clearTextModal={ClearTextModal} 
      setShowClearTextModal={setShowClearTextModal} clearTextFunc={clearText}/>}
      {showPreview ? <Preview handleClosePreview={handleClosePreview} previewStyles={previewStyles}textValue={textValue}/> :
      <div className="container px-4 py-2" style={styles}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="actionBtns d-flex justify-content-between align-items-center flex-wrap">
            <div className="btn-group">
              <button className="btn btn-light btn-sm d-flex justify-content-between align-items-center m-2 dropdown-toggle" 
              type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" disabled={textValue.length === 0}>
                <span className="material-symbols-outlined">text_format</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="popover"
                    title="Popover title"
                    onClick={handleUpClick}
                    disabled={textValue.length === 0}
                  >
                    Uppercase
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLowClick}
                    disabled={textValue.length === 0}
                  >
                    Lowercase
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="popover"
                    title="Popover title"
                    onClick={handleCapitalClick}
                    disabled={textValue.length === 0}
                  >
                    Capitalize
                  </button>
                </li>
              </ul>
            </div>
            <div className="input-group m-2 d-flex" style={{width: 'auto'}}>
              <input value={textStyles.fontSize} onChange={handleChange} type="text" 
              className="form-control" aria-label="Text input with dropdown button" 
              disabled={textValue.length === 0}
              style={{maxWidth: '50px'}}/>
              <button className="btn btn-secondary btn-sm dropdown-toggle d-flex justify-content-between align-items-center" 
              type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={textValue.length === 0}>
                <span className="material-symbols-outlined">text_increase/text_decrease</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{height: '200px', overflow: 'auto'}}>
                {fontSizesArr.map((size, id) => {
                  return <div>
                    {/*<div className='icon'>
                      {choosedSize === filterSizes ? '✔' : ''}
                </div>*/}
                    <li className="dropdown-item" key={id} onClick={handleFontSize}>{size}</li>
                  </div> 
                })}
              </ul>
            </div>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={handleBold}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Bold text."
            >
              <span className="material-symbols-outlined">format_bold</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={handleItalic}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Italic text."
            >
              <span className="material-symbols-outlined">format_italic</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={() => {handleTextAlign('left')}}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Align text left."
            >
              <span className="material-symbols-outlined">format_align_left</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={() => {handleTextAlign('right')}}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Align text right."
            >
              <span className="material-symbols-outlined">format_align_right</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={() => {handleTextAlign('center')}}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Align text center."
            >
              <span className="material-symbols-outlined">format_align_center</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={() => {handleTextAlign('justify')}}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Align text justify."
            >
              <span className="material-symbols-outlined">format_align_justify</span>
            </button>
            <button
              className="btn btn-light btn-sm d-flex m-2"
              onClick={handlePreview}
              disabled={textValue.length === 0}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Preview"
            >
              <span className="material-symbols-outlined">preview</span>
            </button>
            <button
              className={`d-flex btn btn-${copyBtn.btnColor} btn-sm m-2`}
              disabled={textValue.length === 0}
              onClick={copyText}
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-classname="custom-tooltip"
              title="Copy written text."
            >
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>
        </div>
        <div>
          <textarea
            className="form-control"
            id="myTextArea"
            rows="10"
            value={textValue}
            onChange={handleOnChangeTextArea}
            style={textStyles}
          />
        </div>
        <div className="container my-2 d-flex justify-content-between align-items-center">
            <p>
              {textValue.split(/\s+/).filter((e) => e).length} words and{" "}
              {textValue.length} chars
            </p>
            <button type="button" disabled={textValue.length === 0} onClick={handleclearTextModal} 
            className="btn btn-outline-danger btn-sm d-flex justify-content-between align-items-center">
              <span className="material-symbols-outlined">clear_all</span>
            </button>
        </div>
      </div>}
    </>
  );
}

export default Textform;
