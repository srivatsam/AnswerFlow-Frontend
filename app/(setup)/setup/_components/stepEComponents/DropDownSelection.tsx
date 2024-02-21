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
  setToggleDataPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DropDownSelection({
  planSelected,
  fileTypeSelected,
  setFileTypeSelected,
  setToggleDataPopUp,
}: props) {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row justify-start items-stretch lg:justify-between lg:items-center w-full">
        <h1 className="text-[28px] font-bold">Manage Data Sources</h1>
        <div className="px-6 py-3 lg:px-10 lg:py-4 rounded-[10px] bg-[#333333] relative w-full lg:w-[300px] z-[3]">
          <div
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className="flex justify-between items-center gap-16 cursor-pointer w"
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
              toggle && "invisible"
            }`}
          >
            {planSelected !== undefined ? (
              planSelected.datatypes.map((dataType, i) => (
                <div
                  key={i}
                  className="cursor-pointer flex gap-2 items-center "
                  onClick={() => {
                    if (setToggleDataPopUp) setToggleDataPopUp!(true);
                    setFileTypeSelected(dataType);
                    setToggle((prev) => !prev);
                  }}
                >
                  <Image
                    src={`/${dataType}.png`}
                    width={20}
                    height={20}
                    alt={dataType}
                  />
                  <p>{dataType}</p>
                </div>
              ))
            ) : (
              <>
                <p className="w-[60%] h-6 bg-[#4b4b4b] rounded-[5px]"></p>
                <p className="w-[30%] h-6 bg-[#4b4b4b] rounded-[5px]"></p>
                <p className="w-[70%] h-6 bg-[#4b4b4b] rounded-[5px]"></p>
                <p className="w-[50%] h-6 bg-[#4b4b4b] rounded-[5px]"></p>
              </>
            )}
          </div>
        </div>
      </div>
      {!toggle && (
        <div
          onClick={() => {
            setToggle(true);
          }}
          className="fixed w-screen h-screen top-0 left-0 z-[2]"
        ></div>
      )}
    </>
  );
}
