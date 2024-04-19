import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "../../hooks/useForm";
import { http } from "../../helpers/httpHelper";

const CreatePet = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { formValue, changeFormValue } = useForm({
    file: "",
    name: "",
    speciesId: "",
    color: "",
    missingAt: null,
    ownerId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = new FormData();
    Object.keys(formValue).forEach(key => {
      dataToSend.append(key, formValue[key]);
    });

    try {
      const response = await http.post(
        `${import.meta.env.VITE_API_BASE_URL}/pets`,
        dataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log("Server response:", response);
      toast.success("Pet registration successful!");
      setTimeout(() => navigate("/my-pets"), 3000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Pet registration failed. ${error.response.data.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Register Your Pet</h1>
        <input
          type="file"
          name="file"
          onChange={e => changeFormValue({ ...formValue, file: e.target.files[0] })}
          placeholder="Upload pet photo"
        />
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={e => changeFormValue({ ...formValue, name: e.target.value })}
          placeholder="Pet's name"
        />
        <input
          type="text"
          name="speciesId"
          value={formValue.speciesId}
          onChange={e => changeFormValue({ ...formValue, speciesId: e.target.value })}
          placeholder="Species ID"
        />
        <input
          type="text"
          name="color"
          value={formValue.color}
          onChange={e => changeFormValue({ ...formValue, color: e.target.value })}
          placeholder="Color"
        />
        <input
          type="date"
          name="missingAt"
          value={formValue.missingAt || ''}
          onChange={e => changeFormValue({ ...formValue, missingAt: e.target.value })}
          placeholder="Missing At"
        />
        <input
          type="text"
          name="ownerId"
          value={formValue.ownerId}
          onChange={e => changeFormValue({ ...formValue, ownerId: e.target.value })}
          placeholder="Owner ID"
        />
        <button type="submit" disabled={isSubmitting}>
          Register Pet
        </button>
      </form>
    </>
  );
};

export default CreatePet;