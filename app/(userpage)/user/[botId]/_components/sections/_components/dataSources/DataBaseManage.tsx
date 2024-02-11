import React, { useState, useTransition } from "react";

import { toast } from "sonner";
import { addDbData } from "@/actions/addDbData";

export function DataBaseManage() {
  const [name, setName] = useState("");
  const [dbType, setDbType] = useState("");
  const [isPending, startTransition] = useTransition();

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    const inputText = formDataInputs.get("name") as string;
    const parts = inputText.split(/[:@/]/);
    const username = parts[0];
    const password = parts[1];
    const host = parts[2];
    const port = parts[3];
    const dbname = parts[4];
    formDataInputs.append("type", dbType);
    formDataInputs.append("userName", username);
    formDataInputs.append("password", password);
    formDataInputs.append("host", host);
    formDataInputs.append("port", port);
    formDataInputs.append("dbName", dbname);
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addDbData(formDataInputs, botId).then((data) => {
          if (data) {
            setName("");
          }
        });
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Data Added Successfully",
          error: (error) => `${error.message}`,
        });
      });
    }
  };
  return (
    <form
      action={addUrlDataHandle}
      className="flex flex-col gap-6 justify-between items-start w-fit absolute top-[120%] right-0 z-[1] bg-[#232323] rounded-[10px] px-12 py-10 "
    >
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="links" className="text-[18px] font-medium">
          Connect MongoDB Database
        </label>
        <p className="text-[14px] text-[#606060]">
          Enter your database connection credentials
        </p>
      </div>
      <div className="">
        <input
          type="text"
          id="name"
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="{username}:{password}@{host}:{port}/{dbname}"
          className="bg-[#484848] py-4 px-4 outline-none rounded-[10px] text-[14px] w-[390px]"
        />
      </div>
      <div className="flex gap-2">
        <div
          onClick={() => setDbType("mysql")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span
            className={`w-4 h-4 border border-gray-400 rounded-sm ${
              dbType == "mysql" && "bg-blue-600"
            } `}
          />
          <p>MySQL</p>
        </div>
        <div
          onClick={() => setDbType("mongo")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span
            className={`w-4 h-4 border-2 border-gray-400 rounded-sm  ${
              dbType == "mongo" && "bg-blue-600"
            } `}
          />
          <p>MongoDb</p>
        </div>
        <div
          onClick={() => setDbType("postgres")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span
            className={`w-4 h-4 border-2 border-gray-400 rounded-sm  ${
              dbType == "postgres" && "bg-blue-600"
            } `}
          />
          <p>Postgres</p>
        </div>
      </div>
      <button
        disabled={name == "" || isPending || dbType == ""}
        type="submit"
        className={`bg-[#1C1C1C] text-[16px] px-8 py-2 rounded-[10px] w-fit ${
          (isPending || name == "" || dbType == "") &&
          "opacity-50 cursor-not-allowed"
        }`}
      >
        <p>{isPending ? "Importing.." : "Import Data"}</p>
      </button>
    </form>
  );
}
