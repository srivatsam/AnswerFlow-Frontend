"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FormProviderProps {
  children: ReactNode;
}

interface FormData {
  botName: string;
  botPurpose: string;
  toneOfVoice: string;
  openAiApiKey: string;
  files: File[];
  urls: string[];
  dbs: string[];
}

interface FormContextProps {
  formData: {
    botName: string;
    botPurpose: string;
    toneOfVoice: string;
    openAiApiKey: string;
    files: File[];
    urls: string[];
    dbs: string[];
  };
  setBotName: (botName: string) => void;
  setBotPurpose: (botPurpose: string) => void;
  setToneOfVoice: (toneOfVoice: string) => void;
  setOpenAiApiKey: (name: string) => void;
  setFiles: (files: File[]) => void;
  setUrls: (url: string) => void;
  setDbs: (db: string) => void;
  resetFormData: () => void;
}

const LOCAL_STORAGE_KEY = "form_data";

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const storedData =
        typeof window !== "undefined" &&
        localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData
        ? JSON.parse(storedData, (key, value) => {
            if (key === "files" && Array.isArray(value)) {
              return value.map(
                (file: any) => new File([file], file.name, { type: file.type })
              );
            }
            return value;
          })
        : {
            botName: "",
            botPurpose: "",
            toneOfVoice: "",
            openAiApiKey: "",
            files: [],
            urls: [],
            dbs: [],
          };
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return {
        botName: "",
        botPurpose: "",
        toneOfVoice: "",
        openAiApiKey: "",
        files: [],
        urls: [],
        dbs: [],
      };
    }
  });

  useEffect(() => {
    try {
      // Store only essential information about files
      const filesData = formData.files.map((file) => ({
        name: file.name,
        type: file.type,
      }));
      const dataToStore = { ...formData, files: filesData };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  }, [formData]);

  const setBotName = (botName: string) => {
    setFormData((prev) => ({ ...prev, botName }));
  };

  const setBotPurpose = (botPurpose: string) => {
    setFormData((prev) => ({ ...prev, botPurpose }));
  };

  const setToneOfVoice = (toneOfVoice: string) => {
    setFormData((prev) => ({ ...prev, toneOfVoice }));
  };

  const setOpenAiApiKey = (openAiApiKey: string) => {
    setFormData((prev) => ({ ...prev, openAiApiKey }));
  };

  const setFiles = (files: File[]) => {
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const setUrls = (url: string) => {
    setFormData((prev) => ({ ...prev, urls: [...prev.urls, url] }));
  };
  const setDbs = (db: string) => {
    setFormData((prev) => ({ ...prev, dbs: [...prev.dbs, db] }));
  };
  const resetFormData = () => {
    setFormData({
      botName: "",
      botPurpose: "",
      toneOfVoice: "",
      openAiApiKey: "",
      files: [],
      urls: [],
      dbs: [],
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setBotName,
        setBotPurpose,
        setToneOfVoice,
        setOpenAiApiKey,
        setFiles,
        setUrls,
        setDbs,
        resetFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
