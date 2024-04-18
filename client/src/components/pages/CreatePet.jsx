import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { http } from "../../helpers/httpHelper";

const CreatePet = () => {
  const { formValue, changeFormValue } = useForm({
    name: "",
    type: "",
    breed: "",
    dateOfBirth: "",
    image: null,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = new FormData();
    Object.keys(formValue).forEach((key) => {
      dataToSend.append(key, formValue[key]);
    });

    try {
      await http.post(
        `${import.meta.env.VITE_API_BASE_URL}/pets/register`,
        dataToSend
      );
      toast.success("Pet registration successful!");
      setTimeout(() => navigate("/my-pets"), 3000);
    } catch (error) {
      toast.error("Pet registration failed. " + error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

};

export default CreatePet;