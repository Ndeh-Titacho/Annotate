import React, { useState, useRef } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { MdDelete, MdFilePresent } from "react-icons/md";
import { Stage, Layer, Rect, Image, Text } from "react-konva";
import { Input } from "@headlessui/react";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

const Upload = () => {
  const hiddenInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected files");
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState(null);
  const isDrawing = useRef(false);
  const [currentLabel, setCurrentLabel] = useState("");
  const imageRef = useRef(null);
  const labelInputRef = useRef(null);
  const stageRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false); // To highlight the drag area

  const handleClick = () => {
    hiddenInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage(img);
        setFileName(file.name);
        URL.revokeObjectURL(img.src);
      };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleMouseDown = (e) => {
    if (!image || isDrawing.current) return;
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

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !newAnnotation) return;

    const { x, y } = e.target.getStage().getPointerPosition();

    setNewAnnotation({
      ...newAnnotation,
      width: x - newAnnotation.x,
      height: y - newAnnotation.y,
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing.current || !newAnnotation) return;

    isDrawing.current = false;

    const newAnnotationWithLabel = {
      ...newAnnotation,
      label: currentLabel,
    };

    setAnnotations([...annotations, newAnnotationWithLabel]);
    setNewAnnotation(null);
    setCurrentLabel("");
  };

  const handleLabelChange = (e) => {
    setCurrentLabel(e.target.value);
  };

  return (
    <div className="flex">
      <SideBar image={image} fileName={fileName} annotations={annotations} />
      <main className="bg-slate-900 flex flex-col flex-1 justify-center items-center w-full min-h-screen px-4 sm:px-2">
  <section className="bg-slate-800 h-auto w-full sm:w-11/12 md:w-4/5 my-4 flex flex-col items-center py-4 rounded-md">
    <div
      className={`h-80 w-full sm:w-full md:w-3/4 text-white border-2 ${
        isDragOver ? "border-sky-500 bg-sky-700" : "border-dashed border-gray-500"
      } rounded-xl flex flex-col justify-center items-center hover:bg-sky-600`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <IoCloudUpload size={50} className="sm:text-2xl md:text-5xl" onClick={handleClick} />
      <h4 className="mt-2 text-lg sm:text-sm md:text-xl font-bold">Drag and drop your files</h4>
      <input
        className="hidden"
        ref={hiddenInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
    </div>

    <Input
      className="text-white mt-4 w-full sm:w-11/12 md:w-80 pl-4 py-2 rounded-xl bg-transparent border"
      type="text"
      value={currentLabel}
      onChange={handleLabelChange}
      placeholder="Enter label for the annotation"
      ref={labelInputRef}
    />

    <div className="images mt-5 w-full sm:w-full md:w-3/4 border">
      <Stage
        width={window.innerWidth * 0.9} // Responsive width
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {image && (
            <Image
              image={image}
              width={window.innerWidth * 0.8} // Adjust width
              height={(image.height / image.width) * window.innerWidth * 0.8} // Maintain aspect ratio
              ref={imageRef}
            />
          )}
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
              <Text
                x={rect.x}
                y={rect.y - 20}
                text={rect.label}
                fontSize={14}
                fill="black"
                width={rect.width}
                align="center"
              />
            </React.Fragment>
          ))}
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

    <section className="flex flex-col sm:flex-row justify-between items-center px-3 text-white border rounded-md bg-sky-900 w-full sm:w-11/12 md:w-1/2 mt-2">
      <MdFilePresent />
      <span className="truncate w-full text-center">{fileName}</span>
      <MdDelete
        onClick={() => {
          setFileName("No file selected");
          setImage(null);
        }}
      />
    </section>
  </section>
</main>

    </div>
  );
};

export default Upload;
