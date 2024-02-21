"use client";
import React, { useState } from "react";

import { countries } from "@/utils/constData";

type props = {
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  country?: string | null;
};
export function CountryInput({ handleInputChange, country }: props) {
  const [countrySelected, setCountrySelected] = useState(country as string);
  const [isOpen, setIsOpen] = useState(false);
  const searchCountry = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySelected?.toLowerCase())
  );
  return (
    <div className="relative">
      <div className="flex flex-col gap-1 ">
        <label htmlFor="country" className="font-medium">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          autoComplete="country"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            if (handleInputChange) handleInputChange(e);
            setCountrySelected(e.target.value);
          }}
          value={countrySelected}
          required
          placeholder="Enter country"
          className="bg-[#232323] rounded-[10px] p-4 lg:py-4 lg:px-8 outline-none"
        />
      </div>
      {isOpen && (
        <div className="absolute top-[100%] z-10 w-full mt-2 bg-[#232323] rounded-[10px] max-h-40 overflow-y-auto transition-all">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {searchCountry.map((Country) => (
              <div
                key={Country.code}
                className="block px-8 py-4 text-sm text-gray-50 hover:bg-[#2c2c2c] transition-all cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  setCountrySelected(Country.name);
                }}
              >
                {Country.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
