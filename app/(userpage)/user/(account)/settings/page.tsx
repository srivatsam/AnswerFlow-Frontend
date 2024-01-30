import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col w-fit bg-[#131313] rounded-[12px] p-12 gap-8">
        <h1 className="text-[28px] font-bold ">Settings</h1>
        <form /* action={formHandle}  */ className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              /*               value={billingInfoState.email || ""}
              onChange={handleInputChange} */
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
            />
          </div>

          <button
            type="submit"
            /*  disabled={isPending} */
            className={`btn sec ${
              /*  isPending && */ "opacity-50 cursor-not-allowed "
            }`}
          >
            {/* isPending */ /* ? "Loading..." : */ "Send Verification Link"}
          </button>
        </form>
        <h2 className="text-[24px] font-bold text-[#777777]">
          Change Password
        </h2>
        <form /* action={formHandle}  */ className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="currentPassword" className="font-medium">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              /*               value={billingInfoState.email || ""}
              onChange={handleInputChange} */
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              /*               value={billingInfoState.email || ""}
              onChange={handleInputChange} */
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
            />
          </div>
          <button
            type="submit"
            /*  disabled={isPending} */
            className={`btn sec ${
              /*  isPending && */ "opacity-50 cursor-not-allowed "
            }`}
          >
            {/* isPending */ /* ? "Loading..." : */ "Send Verification Link"}
          </button>
        </form>
      </div>
      <div className="flex flex-col  bg-[#131313] rounded-[12px] p-12 gap-8">
        <h1 className="text-[28px] font-bold ">OpenAI API Key</h1>
        <form /* action={formHandle}  */ className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-medium">
              Your API Key
            </label>
            <input
              disabled
              type="email"
              id="email"
              name="email"
              /*               value={billingInfoState.email || ""}
              onChange={handleInputChange} */
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
            />
          </div>

          <button
            type="submit"
            /*  disabled={isPending} */
            className={`btn sec ${
              /*  isPending && */ "opacity-50 cursor-not-allowed "
            }`}
          >
            {/* isPending */ /* ? "Loading..." : */ "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
