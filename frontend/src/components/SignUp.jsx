import bg_img from "../assets/netflix-bg-img.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { ThreeDot } from "react-loading-indicators";
let counter = 1;
const schema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Invalid email"
    ),
  password: yup
    .string()
    .required("password is required")
    .min(6, "minimum 6 characters required")
    .max(10, "maximum 10 characters only allowed"),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password")], "password did not match"),
});
// you have to give the scheme to the useForm via object the resolver key
//assign the yupresolver funtion to resolver key

 

function SignUp() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate=useNavigate()

  const [loading,setLoading]=useState(false)

  console.log("rerender", counter++);

  console.log("error", errors);
  
  async function handleSignUp(data) {
    try {
      setLoading(true)
      const { email, password } = data;
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/signup`, {
        email,
        password,
      });
      console.log(res.data);
      toast.success(res.data.message || "Signed Up successfully!");
      reset();
      setTimeout(() => {
      navigate("/login")
    }, 200);
      
    } catch (error) {
      console.log("error catched", error);
      const msg =
      error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
    finally{
      //definitely runs both whatever the res may be(success/error)
     setLoading(false)
   }
  }
 
  useEffect(()=>{
    console.log("LOADING STATE",loading)
  },[loading])

  return (
    //handleSubmit is an predefined my function returned by useForm() hook u should pass an callback to it and by default that callback receives data in the parameter
    //handleSubmit is called only after checking all the requirements are met
    //otherwise even if u click submit the handleSubmit wont be called
    <div className="h-screen w-full relative">
      <img
        src={bg_img}
        alt="bg-image"
        className="w-full h-full absolute -z-10"
      />
      <div className="flex justify-center items-center absolute z-0 inset-0 pt-10">
        <div className=" bg-black/90 text-slate-50 p-7 sm:p-9 w-[85%] xs:w-[76%] sm:w-[60%] md:w-[55%] lg:w-[50%] rounded-md flex flex-col gap-4">
          <h1 className=" text-3xl font-semibold">Sign Up </h1>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="mt-3 flex flex-col gap-5"
          >
            <div className="flex-grow">
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                className={`${errors.email?"border-2 border-red-600":""} w-full p-2 bg-zinc-700 text-slate-50 rounded-md focus:outline-none`}
              />
             <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex-grow">
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className={`${errors.password?"border-2 border-red-600":""} w-full p-2 bg-zinc-700 text-slate-50 rounded-md focus:outline-none`}
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <div className="flex-grow">
              <input
              type="password"
              {...register("confirmPassword")}
              placeholder="confirm password"
              className={`${errors.confirmPassword?"border-2 border-red-600":""} w-full p-2 bg-zinc-700 text-slate-50 rounded-md focus:outline-none`}
            />
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
            </div>
            

            <button className="bg-red-600 p-2 rounded-md">{loading?<ThreeDot size="medium"  color="white" />:"Sign Up"}</button>
          </form>
          <div className="flex justify-between text-xs">
            <div className="flex gap-1">
              <input type="checkbox" />
              <p> Remember Me</p>
            </div>
            <p>Need help?</p>
          </div>
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-50 hover:text-blue-600">
              login
            </Link>
          </p>
          <p className="text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
          <p className="text-xs underline text-blue-600 underline-offset-2">
            Learn more
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
