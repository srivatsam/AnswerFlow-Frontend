import Image from "next/image";
import React, { useState } from "react";

type props = {
  planSelected:
    | {
        name: string;
        datatypes: fileTypeSelected[];
      }
    | undefined;
  fileTypeSelected: fileTypeSelected;
  setFileTypeSelected: React.Dispatch<React.SetStateAction<fileTypeSelected>>;
};
export default function DropDownSelection({
  planSelected,
  fileTypeSelected,
  setFileTypeSelected,
}: props) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-[40px] font-bold">Connect Data Sources</h1>
      <div className="px-10 py-4 rounded-[10px] bg-[#333333] relative w-[300px]">
        <div
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="flex justify-between items-center gap-16 cursor-pointer"
        >
          <p>{fileTypeSelected}</p>
          <Image
            src={"/rightarrow.png"}
            width={8}
            height={8}
            alt="rightarrow png"
            className={` transition-all ${toggle && "rotate-90"}`}
          />
        </div>
        <div
          className={`flex justify-start flex-col gap-4 px-10 py-4 rounded-[10px] bg-[#333333] absolute top-[70px] w-[stretch] left-0 ${
            toggle && " invisible"
          }`}
        >
          {planSelected?.datatypes.map((dataType, i) => (
            <p
              key={i}
              className="cursor-pointer"
              onClick={() => {
                setFileTypeSelected(dataType);
                setToggle((prev) => !prev);
              }}
            >
              {dataType}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
