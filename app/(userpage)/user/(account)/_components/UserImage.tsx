import Image from "next/image";
import React, { useState } from "react";
import { SingleImageDropzone } from "./single-image";
import { useEdgeStore } from "@/lib/edgestore";
type props = {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  imageUrl: string;
};
export function UserImage({ setImageUrl, imageUrl }: props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: imageUrl,
        },
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      setImageUrl(res.url);
      setToggle(false);
    }
  };
  return (
    <div className="relative">
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col gap-2 w-fit items-center cursor-pointer">
          <div className="w-[80px] h-[80px] bg-[#ffffff] rounded-full overflow-hidden">
            <Image
              src={imageUrl}
              width={80}
              height={80}
              alt="user image"
              className="object-contain"
            />
          </div>
          <div className="">
            <p onClick={() => setToggle(true)}>update</p>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="fixed flex h-screen w-screen inset-0 z-[99999] justify-center items-center ">
          <div className="w-[340px] bg-[#3F3F3F]  z-[99999] px-10 py-8 rounded-xl shadow-xl flex flex-col justify-center items-center gap-6">
            <h1 className="text-2xl font-semibold">Select Image</h1>
            <SingleImageDropzone value={file} onChange={onChange} />
          </div>
          <div
            onClick={() => setToggle(false)}
            className="fixed z-[9999] backdrop-blur-[2px] h-screen w-screen inset-0"
          ></div>
        </div>
      )}
    </div>
  );
}
