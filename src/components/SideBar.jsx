import { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io"
import annotate from "../assets/annotate.png"

const SideBar = () => {


    const [open, setOpen] = useState(true)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState('No selected files')
    const [annotations, setAnnotations] = useState([]); // Saved annotations
      
     
     
    

    const exportToCOCO = () => {
        const cocoData = {
          images: [
            {
              id: 1, // Image ID (can be extended for multiple images)
              file_name: fileName, // File name from the uploaded image
              width: 800, // Image width (you can dynamically get this from the image)
              height: (image.height / image.width) * 800, // Image height based on aspect ratio
            }
          ],
          annotations: annotations.map((annotation, index) => ({
            id: index + 1,
            image_id: 1, // Image ID (same as in the image object)
            category_id: 1, // Category ID for the label (we can use a predefined category for simplicity)
            bbox: [
              annotation.x, // X position
              annotation.y, // Y position
              annotation.width, // Width of the annotation
              annotation.height, // Height of the annotation
            ],
            area: annotation.width * annotation.height, // Area of the bounding box
            iscrowd: 0, // Assuming this is not a crowd annotation (set to 0)
          })),
          categories: [
            {
              id: 1, // Category ID
              name: "label", // Label (can be dynamic based on annotations)
            }
          ]
        };
      
        // Convert the data to a JSON string
        const json = JSON.stringify(cocoData, null, 2);
      
        // Create a Blob and download it as a file
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "annotations_coco.json"; // Set the download file name
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL object
      };
    
      
      const exportToYOLO = () => {
        const imageWidth = 800; // Image width
        const imageHeight = (image.height / image.width) * 800; // Image height based on aspect ratio
      
        const yoloData = annotations.map((annotation) => {
          const x_center = (annotation.x + annotation.width / 2) / imageWidth; // Normalize X center
          const y_center = (annotation.y + annotation.height / 2) / imageHeight; // Normalize Y center
          const width = annotation.width / imageWidth; // Normalize width
          const height = annotation.height / imageHeight; // Normalize height
      
          // Returning YOLO formatted data: class_id x_center y_center width height
          return `0 ${x_center} ${y_center} ${width} ${height}`; // Class id is 0
        });
      
        // Create a Blob and download it as a file
        const blob = new Blob([yoloData.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "annotations_yolo.txt"; // Set the download file name
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL object
      };
  return (
    <div>
           <aside className={`${open ? 'w-20' : 'w-72'}  pt-3 duration-300 min-h-screen bg-slate-800 relative `}>
              <div className="flex gap-x-4 items-center mt-5 fixed">
                <img src={annotate} sizes={100} alt="" className={` ml-5 cursor-pointer duration-500`} />
                <h1 className={`text-white font-bold origin-left text-2xl ${ open && 'scale-0'} `}>Annotate</h1>
              </div>
        
              
                {/* menu list */}
                <ul className="mt-20 fixed">
                 
                   <li onClick={exportToCOCO} className="text-gray-300 text-sm flex items-center gap-x-4 p-4 cursor-pointer hover:bg-slate-50 rounded-md hover:text-sky-700"> 
                  <img src="./src/assets/coco.png" alt="" />
                  <span  className={`${open && 'hidden'}  font-medium`} >Export to COCO</span>
        
                </li>
                <li onClick={exportToYOLO} className="text-gray-300 text-sm flex items-center gap-x-4 p-4  cursor-pointer hover:bg-slate-50 rounded-md hover:text-sky-700"> 
                  <img src="./src/assets/yolo.png" alt="" />
                  <span  className={`${open && 'hidden'}  font-medium`} >Export to YOLO</span>
        
                </li>
                </ul>
        
                <IoIosArrowDropright size={30} className={` fixed top-9 left-60 text-white ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)} />
            </aside>
    </div>
  )
}

export default SideBar