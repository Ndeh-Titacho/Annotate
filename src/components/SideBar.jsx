import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import cocoIcon from "../assets/coco.png";
import yoloIcon from "../assets/yolo.png";
import annotate from "../assets/annotate.png";
import { toast } from "react-toastify";

const SideBar = ({ image, fileName, annotations }) => {
  const [open, setOpen] = useState(true);

  const exportToCOCO = () => {
    if (!image) {
      toast.error("No image uploaded. Please upload an image to export annotations!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const cocoData = {
      images: [
        {
          id: 1,
          file_name: fileName,
          width: image.width,
          height: image.height,
        },
      ],
      annotations: annotations.map((annotation, index) => ({
        id: index + 1,
        image_id: 1,
        category_id: 1,
        bbox: [
          annotation.x,
          annotation.y,
          annotation.width,
          annotation.height,
        ],
        area: annotation.width * annotation.height,
        iscrowd: 0,
      })),
      categories: [
        {
          id: 1,
          name: "label",
        },
      ],
    };

    const json = JSON.stringify(cocoData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "annotations_coco.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToYOLO = () => {
    if (!image) {
      toast.error("No image uploaded. Please upload an image to export annotations!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const yoloData = annotations.map((annotation) => {
      const x_center = (annotation.x + annotation.width / 2) / image.width;
      const y_center = (annotation.y + annotation.height / 2) / image.height;
      const width = annotation.width / image.width;
      const height = annotation.height / image.height;

      return `0 ${x_center} ${y_center} ${width} ${height}`;
    });

    const blob = new Blob([yoloData.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "annotations_yolo.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        className="sm:flex md:hidden fixed top-4 left-4 bg-sky-600 text-white p-2 rounded-md z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Menu" : "Show Menu"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:w-64 md:w-72 bg-slate-800`}
      >
        <div className="flex gap-x-4 items-center mt-5 px-4">
          <img src={annotate} alt="Annotate" className="w-10 h-10" />
          <h1
            className={`text-white font-bold text-2xl transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            Annotate
          </h1>
        </div>

        <ul className="mt-20">
          <li
            onClick={exportToCOCO}
            className="text-gray-300 text-sm flex items-center gap-x-4 p-4 cursor-pointer hover:bg-slate-50 rounded-md hover:text-sky-700"
          >
            <img src={cocoIcon} alt="COCO Icon" className="w-6 h-6" />
            <span
              className={`transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Export to COCO
            </span>
          </li>
          <li
            onClick={exportToYOLO}
            className="text-gray-300 text-sm flex items-center gap-x-4 p-4 cursor-pointer hover:bg-slate-50 rounded-md hover:text-sky-700"
          >
            <img src={yoloIcon} alt="YOLO Icon" className="w-6 h-6" />
            <span
              className={`transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Export to YOLO
            </span>
          </li>
        </ul>

        <IoIosArrowDropright
          size={30}
          className={`absolute top-9 right-[-15px] bg-slate-800 rounded-full text-white cursor-pointer ${
            open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </aside>
    </>
  );
};

export default SideBar;
