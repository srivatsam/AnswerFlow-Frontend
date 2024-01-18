import React, { useEffect, useState } from "react";
import BotSelection from "./BotSelection";
import { APIBACKEND } from "@/utils/constData";

export function Bots() {
  const [bots, setBots] = useState<any>();
  useEffect(() => {
    getBots();
  }, []);
  const getBots = async () => {
    try {
      const response = await fetch(`${APIBACKEND}/get_bots/1`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (data.status == "error") {
        throw new Error(`${data.message}`);
      }
      setBots(data.bots);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return <BotSelection bots={bots} />;
}
