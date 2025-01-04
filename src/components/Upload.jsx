
import React, { useState, useRef } from "react"
import { IoCloudUpload } from "react-icons/io5"
import {MdDelete, MdFilePresent} from "react-icons/md"
import { Stage, Layer,  Rect, Image,  Text } from "react-konva"
import { Input } from '@headlessui/react'
import { toast } from "react-toastify"; // Import Toastify
import SideBar from "./SideBar"



const Upload = () => {
    

const hiddenInputRef = useRef(null)
const [image, setImage] = useState(null)
const [fileName, setFileName] = useState('No selected files')
const [annotations, setAnnotations] = useState([]); // Saved annotations
  const [newAnnotation, setNewAnnotation] = useState(null); // Currently drawn rectangle
  const isDrawing = useRef(false);
  const [currentLabel, setCurrentLabel] = useState(""); // The current label input
  const imageRef = useRef(null);
  const labelInputRef = useRef(null); // Reference to label input
  const stageRef = useRef(null);
 


  // // Handle dynamic resizing of the Stage based on the parent div size
  // useEffect(() => {
  //   if (parentDivRef.current) {
  //     setStageWidth(parentDivRef.current.offsetWidth);
  //     setStageHeight(parentDivRef.current.offsetHeight);
  //   }
    
  //   // Optional: Adjust the size when the window is resized
  //   const handleResize = () => {
  //     if (parentDivRef.current) {
  //       setStageWidth(parentDivRef.current.offsetWidth);
  //       setStageHeight(parentDivRef.current.offsetHeight);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);



    const handleClick = () => {
        hiddenInputRef.current.click()
      
      }

       // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
   
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage(img);
        setFileName(file.name)
        URL.revokeObjectURL(img.src); // Free memory after loading
      };
    }
  };

  
  // Start drawing
  const handleMouseDown = (e) => {
    if (!image || isDrawing.current) return;

    // Check if label is entered, if not show error and stop drawing
    if (currentLabel.trim() === "") {
      toast.error("Please enter a label for the annotation!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    isDrawing.current = true;
    const { x, y } = e.target.getStage().getPointerPosition();

    setNewAnnotation({ x, y, width: 0, height: 0 });
  };

  // Update the rectangle as the user drags
  const handleMouseMove = (e) => {
    if (!isDrawing.current || !newAnnotation) return;

    const { x, y } = e.target.getStage().getPointerPosition();

    setNewAnnotation({
      ...newAnnotation,
      width: x - newAnnotation.x,
      height: y - newAnnotation.y,
    });
  };

  // Finalize and save the rectangle with label
  const handleMouseUp = () => {
    if (!isDrawing.current || !newAnnotation) return;

    isDrawing.current = false;

    const newAnnotationWithLabel = {
      ...newAnnotation,
      label: currentLabel, // Save the label
    };
    

    setAnnotations([...annotations, newAnnotationWithLabel]);
    setNewAnnotation(null);
    setCurrentLabel(""); // Reset the label input
  };

  // Handle label input change
  const handleLabelChange = (e) => {
    setCurrentLabel(e.target.value);
  };


  
  
  

 
   
  return (
    <  >
    <div className="flex">
      <SideBar />

 
<main className="bg-slate-900 flex flex-col flex-1 justify-center items-center w-full min-h-screen">
         <section
      className="bg-slate-800 h-auto w-4/5 my-2 flex flex-col items-center justify-center py-4 rounded-md flex-1 "
    >
      <div
        className="bg-slate-700 h-80 w-3/4 text-white border border-dashed border-gray-500 rounded-xl flex flex-col justify-center items-center hover:bg-sky-600"
      >
        <IoCloudUpload size={75} onClick={handleClick} />

        <h4 className="mt-2 text-xl font-bold">Drag and drop your files</h4>
     
        <input className="text-white border rounded-md py-2 px-10 font-bold hover:bg-sky-600" ref={hiddenInputRef} type="file" accept="image/*" multiple hidden 
        
        
        onChange={ handleImageUpload}
        />

 
      </div>

             {/* input field for label */}
<Input className="text-white mt-7 w-80 pl-4 py-2 rounded-xl bg-transparent border"
        type="text"
        value={currentLabel}
        onChange={handleLabelChange}
        placeholder="Enter label for the annotation"
        ref={labelInputRef}
       
      />


      
      <div className="images mt-5  border" >

      <Stage
         width={600}
         height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        
      >
        <Layer>
   
          {/* Display the uploaded image */}
          {image && (
            <Image
              image={image}
              width={600}
              height={(image.height / image.width) * 800} // Maintain aspect ratio
              ref={imageRef}
              className={`border-sky-100 border-3`}
            />
          
          )}
          {/* Render saved annotations */}
          {annotations.map((rect, i) => (
            <React.Fragment key={i}>
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="rgba(0, 255, 0, 0.5)"
                stroke="green"
                strokeWidth={2}
              />
                 <Rect 
                x={rect.x}
                y={rect.y - 30} // Position label box above the rectangle
                width={rect.width}
                height={30} // Fixed height for the label box
                fill="white"
                stroke="black"
                strokeWidth={1}
                cornerRadius={5} // Rounded corners for the label box
              />
              {/* Display label next to the rectangle */}
              <Text
                x={rect.x}
                y={rect.y - 20} // Position label above the rectangle
                text={rect.label}
                fontSize={14}
                fill="black"
                width={rect.width}
                align="center"
              />
            </React.Fragment>
          ))}
          {/* Render the rectangle being drawn */}
          {newAnnotation && (
            <Rect
              x={newAnnotation.x}
              y={newAnnotation.y}
              width={newAnnotation.width}
              height={newAnnotation.height}
              fill="rgba(0, 0, 255, 0.5)"
              stroke="blue"
              strokeWidth={2}
            />
          )}
          
        </Layer>
        
      </Stage>
       
        
        
      
      

      </div>
      <section className="flex justify-between items-center px-3 text-white border rounded-md bg-sky-900 w-1/2 mt-2">
       <MdFilePresent />
       {fileName}
       <MdDelete onClick={ ()=>{ 
        setFileName("No file selected")
        setImage(null)
       }
       } />
       </section>
    </section>
    
    
    </main>
    </div>
    </>
  )
}

export default Upload