"use client";

import { SingleImageDropzone } from "./single-image";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { useState } from "react";

type props = {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  imageUrl: string | null;
};
function UploadImage({ setImageUrl, imageUrl }: props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file);
      const res = await edgestore.publicFiles.upload({ file });
      setImageUrl(res.url);
      setToggle(false);
    }
  };
  return (
    <div className="relative">
      <div className="flex w-full justify-center items-center">
        <div
          onClick={() => setToggle(true)}
          className="flex flex-col gap-2 w-fit items-center cursor-pointer"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={80}
              height={80}
              alt="user image"
              className=" bg-[#3F3F3F] rounded-full"
            />
          ) : (
            <div className="p-10 bg-[#3F3F3F] rounded-full">
              <Image
                src={"/uploadImage.png"}
                width={30}
                height={30}
                alt="upload image"
              />
            </div>
          )}

          <p>Photo</p>
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

export default UploadImage;
