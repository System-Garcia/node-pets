import { useState } from "react";
import axios from "axios";
import mankeyImage from "/img/mankey.png";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  HiMail,
  HiPhone,
  HiUser,
  HiLockClosed,
  HiCalendar,
} from "react-icons/hi";
import { useForm } from "../../hooks/useForm";
import { post } from "../../helpers/axiosHelper";

const CreateA = () => {
  const { formValue, changeFormValue } = useForm({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    dateOfBirth: "",
  });

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "file") {
      setFileName(files[0].name);
      changeFormValue({
        target: {
          name: "file",
          value: files[0],
        },
      });
    } else {
      changeFormValue(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = new FormData();
    Object.keys(formValue).forEach((key) => {
      dataToSend.append(key, formValue[key]);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        dataToSend
      );
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error("Registration failed. " + error.response.data.message);
    } finally {
      setIsSubmitting(false);
    } 
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    handleDrag(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e) => {
    handleDrag(e);
    setDragging(false);
  };

  const handleDrop = (e) => {
    handleDrag(e);
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      handleChange({
        target: {
          name: "file",
          files: files,
        },
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center px-4 ">
        <div className="flex w-full max-w-4xl md:rounded-lg md:shadow-xl">
          <div className="hidden md:flex bg-[#4B92FC] rounded-l-lg w-full md:w-1/2 justify-center items-center">
            <img
              src={mankeyImage}
              alt="Ilustración"
              className="w-full max-w-lg"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white p-8 rounded-r-lg">
            <h1 className="text-2xl font-bold text-center mb-6">
              Create Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiMail className="ml-2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiPhone className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiUser className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiUser className="ml-2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiLockClosed className="ml-2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 focus:border-[#4B92FC] rounded-md">
                <HiCalendar className="ml-2 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div
                className={`flex items-center justify-center p-5 relative border-2 ${
                  dragging ? "border-blue-500" : "border-dotted border-gray-300"
                } rounded-md`}
                onDragOver={handleDrag}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDrop={handleDrop}
              >
                <FaCloudUploadAlt className="text-[#4B92FC] mx-auto text-6xl" />
                <input
                  type="file"
                  name="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleChange}
                  multiple
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-2">
                  <span className="block text-[#4B92FC] bg-white rounded px-3 py-1 shadow-lg text-sm">
                    Select or drop files here
                  </span>
                  {fileName && (
                    <span className="text-sm text-gray-600 mt-2">
                      {fileName}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <button
                  type="submit"
                  className="block w-full text-white bg-[#4B92FC] rounded-md py-2 shadow-lg hover:bg-[#3b82f6]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
                {isSubmitting && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="loader"></div>
                  </div>
                )}
              </div>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Already have an account?
              <Link to="/login" className="text-[#4B92FC] hover:text-[#3b82f6]">
                {" "}
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateA;
