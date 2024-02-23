import React, { useEffect, useState, useTransition } from "react";

import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
import { addDbData } from "@/actions/addDbData";
type props = { handleNext: () => void };
interface dataBaseFormType {
  host: string;
  port: string;
  userName: string;
  password: string;
  dbName: string;
}

export function DataBaseForm({ handleNext }: props) {
  const [dbType, setDbType] = useState("");
  const increaseProgressByNumber = useProgressBar(
    (state) => state.increaseProgressByNumber
  );
  const [dataBaseForm, setDataBaseForm] = useState<dataBaseFormType>({
    host: "",
    port: "",
    userName: "",
    password: "",
    dbName: "",
  });
  const [isPending, startTransition] = useTransition();
  const { setDbs, formData } = useFormContext();
  const setNewState = (newState: Partial<dataBaseFormType>) => {
    setDataBaseForm((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    formDataInputs.append("type", dbType);
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(async () => {
        const addDBDatePromise = await addDbData(formDataInputs, botId);
        if (addDBDatePromise.success) {
          setDbs(formDataInputs.get("dbName") as string);
          setDataBaseForm({
            host: "",
            port: "",
            userName: "",
            password: "",
            dbName: "",
          });
          setDbType("");
          increaseProgressByNumber(0.3);
          toast.success(addDBDatePromise.success);
        }
        if (addDBDatePromise.error) {
          toast.error(addDBDatePromise.error);
        }
      });
    }
  };
  useEffect(() => {
    if (isPending) {
      toast.loading("Loading ...!");
    }
  }, [isPending]);
  function getButtonClass(isPending: boolean, dataBaseForm: dataBaseFormType) {
    const isFormInvalid =
      isPending ||
      dataBaseForm.host === "" ||
      dataBaseForm.port === "" ||
      dataBaseForm.userName === "" ||
      dataBaseForm.password === "" ||
      dataBaseForm.dbName === "" ||
      dbType === "";

    return `btn sec flex !justify-around ${
      isFormInvalid ? "opacity-50 cursor-not-allowed" : ""
    }`;
  }
  return (
    <form
      action={addUrlDataHandle}
      className="flex-1 flex flex-col justify-between gap-6 w-full"
    >
      <div className="flex flex-col gap-6  ">
        <div className="flex gap-4 w-[100%]">
          <div className="flex flex-col gap-4 w-[100%]">
            <label htmlFor="host" className="text-[20px] font-medium">
              Host
            </label>
            <input
              type="text"
              id="host"
              required
              name="host"
              value={dataBaseForm.host}
              onChange={(e) => setNewState({ host: e.target.value })}
              placeholder="Enter a host link"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
          <div className="flex flex-col gap-4 w-[100%]">
            <label htmlFor="port" className="text-[20px] font-medium">
              Port
            </label>
            <input
              type="text"
              id="port"
              required
              name="port"
              value={dataBaseForm.port}
              onChange={(e) => setNewState({ port: e.target.value })}
              placeholder="Enter a port"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
        </div>
        <div className="flex gap-4 w-[100%]">
          <div className="flex flex-col gap-4 w-[100%]">
            <label htmlFor="dbName" className="text-[20px] font-medium">
              DB name
            </label>
            <input
              type="text"
              id="dbName"
              required
              name="dbName"
              value={dataBaseForm.dbName}
              onChange={(e) => setNewState({ dbName: e.target.value })}
              placeholder="Enter a DB name"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
          <div className="flex flex-col gap-4 w-[100%]">
            <label htmlFor="userName" className="text-[20px] font-medium">
              Username
            </label>
            <input
              type="text"
              id="userName"
              required
              name="userName"
              value={dataBaseForm.userName}
              onChange={(e) => setNewState({ userName: e.target.value })}
              placeholder="Enter a username"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[100%]">
          <label htmlFor="password" className="text-[20px] font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            name="password"
            value={dataBaseForm.password}
            onChange={(e) => setNewState({ password: e.target.value })}
            placeholder="Enter a password"
            className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
          />
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => setDbType("mysql")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span
              className={`w-4 h-4 border border-gray-400 rounded-sm ${
                dbType === "mysql" && "bg-blue-600"
              } `}
            />
            <p>MySQL</p>
          </div>
          <div
            onClick={() => setDbType("mongodb")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span
              className={`w-4 h-4 border-2 border-gray-400 rounded-sm  ${
                dbType === "mongodb" && "bg-blue-600"
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
                dbType === "postgres" && "bg-blue-600"
              } `}
            />
            <p>Postgres</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          disabled={
            isPending ||
            dataBaseForm.host === "" ||
            dataBaseForm.port === "" ||
            dataBaseForm.userName === "" ||
            dataBaseForm.password === "" ||
            dataBaseForm.dbName === "" ||
            dbType === ""
          }
          type="submit"
          className={getButtonClass(isPending, dataBaseForm)}
        >
          <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
        </button>
        <button
          disabled={
            isPending ||
            (formData.files.length == 0 &&
              formData.urls.length == 0 &&
              formData.dbs.length == 0)
          }
          className={`btn sec flex !justify-around ${
            ((formData.urls.length == 0 &&
              formData.files.length == 0 &&
              formData.dbs.length == 0) ||
              isPending) &&
            " opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNext}
        >
          <p>Finish Setup</p>
        </button>
      </div>
    </form>
  );
}
