import { countries } from "@/utils/constData";
import React, { useState } from "react";

export function PhoneInput() {
  const [countrySelected, setCountrySelected] = useState("+00");
  const [isOpen, setIsOpen] = useState(false);
  const searchCountry = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySelected.toLowerCase()) ||
      country.phone.includes(countrySelected.slice(1))
  );
  return (
    <div className="relative">
      <div className="flex flex-col gap-1 ">
        <label htmlFor="phoneNumber" className="font-medium">
          Phone Number
        </label>
        <div className="flex gap-4">
          <input
            onClick={() => setIsOpen(true)}
            onChange={(e) => setCountrySelected(e.target.value)}
            value={countrySelected}
            required
            className="bg-[#232323] rounded-[10px] p-4 outline-none w-20 text-center"
          />
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="Enter your phone number"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none w-full"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute bottom-[100%] z-10 w-full mt-2 bg-[#2b2b2b] rounded-[10px] max-h-40 overflow-y-auto transition-all">
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
                  setCountrySelected(`+${Country.phone}`);
                }}
              >
                {"+"}
                {Country.phone} {" : "}
                {Country.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
