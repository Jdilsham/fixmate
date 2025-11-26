import { useNavigate } from "react-router-dom";
import TopWave from "../Components/Login & Signup/TopWave";
import BottomWave from "../Components/Login & Signup/BottomWave";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Btn from "../Components/Btn";

export default function SignupPage() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("User");

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
          role: role,
        }
      );
      console.log("Signup successful:", response.data);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response?.data) {
        const errors = error.response.data;

        // If backend sent field errors (object)
        if (typeof errors === "object" && !Array.isArray(errors)) {
          const firstError = Object.values(errors)[0]; // get first message
          toast.error(firstError);
          return;
        }

        // If backend sends a normal error message
        if (errors.message) {
          toast.error(errors.message);
          return;
        }
      }
      toast.error(`Signup failed. please try again.`);
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[480px] h-[780px] rounded-[15px] flex flex-col justify-between bg-gradient-to-b from-[#A4E5EF] via-[#FCFFFF] to-[#B6E8F0]">
        {/*top wave form*/}
        <TopWave />

        <div className="w-[480px] h-[780px] absolute  rounded-[15px]  flex flex-col justify-center items-center gap-7 p-10">
          <span className="text-[48px] text-[#2C566A] font-semibold ">
            Sign up
          </span>

          {/* {name fields} */}
          <div className="w-full h-[40px] flex flex-row items-center gap-4 p-3 ">
            <IoPersonCircleSharp size={30} color="#000" />
            <input
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              type="text"
              className="w-[calc(48%)] h-[40px]  border-[#0B6B7E] flex items-center px-3 font-regular border-0 border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 "
              placeholder={"First Name"}
            />
            <input
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              type="text"
              className="w-[calc(48%)] h-[40px]  border-[#0B6B7E] flex items-center px-3 font-regular border-0 border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 "
              placeholder={"Last Name"}
            />
          </div>

          {/* {email field} */}
          <div className="w-full h-[40px] flex flex-row items-center gap-2 p-2 ">
            <MdAttachEmail size={30} color="#000" />
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              className="w-full h-[40px] border-0 border-b-2 border-[#0B6B7E] flex items-center px-3 font-regular focus:border-blue-500 focus:outline-none focus:ring-0 "
              placeholder={"Email"}
            />
          </div>

          {/* {phone number field} */}
          <div className="w-full h-[40px] flex flex-row items-center gap-2 p-2 ">
            <MdAttachEmail size={30} color="#000" />
            <input
              onChange={(e) => {
                setphone(e.target.value);
              }}
              type="tel"
              className="w-full h-[40px] border-0 border-b-2 border-[#0B6B7E] flex items-center px-3 font-regular focus:border-blue-500 focus:outline-none focus:ring-0 "
              placeholder={"Phone Number"}
            />
          </div>

          {/* {password field} */}
          <div className="w-full h-[40px] flex flex-row items-center gap-2 p-2 ">
            <GiPadlock size={30} color="#000" />
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              className="w-full h-[40px] border-0 border-b-2 border-[#0B6B7E] flex items-center px-3 font-regular focus:border-blue-500 focus:outline-none focus:ring-0 "
              placeholder="Password"
            />
          </div>

          {/* {confirm password field} */}
          <div className="w-full h-[40px] flex flex-row items-center gap-2 p-2 ">
            <GiPadlock size={30} color="#000" />
            <input
              onChange={(e) => {
                setconfirmpassword(e.target.value);
              }}
              type="password"
              className="w-full h-[40px] border-0 border-b-2 border-[#0B6B7E] flex items-center px-3 font-regular focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder="Confirm Password"
            />
          </div>

          {/* {role selection field} */}
          <div className="w-full h-[40px]  flex flex-row items-center gap-2 p-2 ">
            <div className="w-[calc(30%)] h-[40px] text-[16px] flex items-center justify-center ">
              <span>I want to : </span>
            </div>
            <div className="w-[calc(70%)] h-[40px] border-0 border-b-2 border-[#0B6B7E] flex items-center justify-center ">
              <select
                onChange={(e) => {
                  setrole(e.target.value);
                }}
                className="w-[calc(100%-100px)] h-[40px] flex flex-row items-center gap-2 p-2 "
              >
                <option value="" hidden defaultChecked>
                  Select an option
                </option>
                <option value="User">Hire Services</option>
                <option value="Facilitator">Provide Services</option>
              </select>
            </div>
          </div>

          <Btn
            onClick={handleSignup}
            bg="bg-[#0E9598]"
            textColor="text-white"
            label="Sign Up"
          />
          <div>
            <span>Already have an account? </span>
            <a href="/login" className="text-[#0B6B7E]">
              Login
            </a>
          </div>
        </div>
        <BottomWave />
      </div>
    </div>
  );
}
