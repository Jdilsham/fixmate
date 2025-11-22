import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-hot-toast";
import Btn from "../Components/Btn";

export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email: username,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);
      const user = response.data.user;
      console.log("Login successful:", user);
      toast.success("Login successful!");
      // if (user.isAdmin) {
      //   // navigate("/admin");
      //   console.log("Admin logged in");
      // } else if (user.isUser) {
      //   // navigate("/customer");
      //   console.log("Customer logged in");
      // } else if (user.isFacilitator) {
      //   // navigate("/facilitator");
      //   console.log("Facilitator logged in");
      // }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center  ">
      <div className="w-[414px] h-[680px] rounded-[15px]  flex flex-col justify-between bg-gradient-to-b from-[#A4E5EF] via-[#FCFFFF] to-[#B6E8F0]">
        {/*top wave form*/}
        {/* <TopWave /> */}
        <div className="w-[414px] h-[680px] absolute  rounded-[15px]  flex flex-col justify-center items-center gap-10 p-10">
          <span className="text-[48px] text-[#2C566A] font-semibold ">
            Login
          </span>
          <div className="w-full h-[40px] flex flex-row items-center gap-2">
            <IoPersonCircleSharp size={30} color="#000" />
            <input
              onChange={(e) => {
                setusername(e.target.value);
              }}
              type="text"
              className="w-full h-[40px] border-0 border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 border-[#0B6B7E] flex items-center px-3 font-regular backdrop-blur-lg "
              placeholder={"Username or Email"}
            />
          </div>
          <div className="w-full h-[40px] flex flex-row items-center gap-2">
            <GiPadlock size={30} color="#000" />
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              className="w-full h-[40px] border-0 border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 border-[#0B6B7E] flex items-center px-3 font-regular backdrop-blur-lg "
              placeholder="Password"
            />
          </div>
          <div className="w-full h-[40px] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 " />
              <span>Remember Me</span>
            </div>
            <a href="/">Forget password?</a>
          </div>

          <Btn
            onClick={handleLogin}
            bg="bg-[#0E9598]"
            textColor="text-white"
            label="Login"
          />
          <div>
            <span>Don't have an account? </span>
            <a href="/signup" className="text-[#0B6B7E]">
              Sign Up
            </a>
          </div>
        </div>
        {/*bottom wave form */}
        {/* <BottomWave /> */}
      </div>
    </div>
  );
}
