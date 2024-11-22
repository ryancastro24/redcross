import { useState, useEffect } from "react";
import "../app/globals.css";
import { CgClose } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateFormModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <CgClose />
          </button>
          <h1 className="text-2xl mb-10">Update Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                name="contact"
                value={formData?.contact || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                value={formData?.category || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date Started</label>
              <input
                name="dateStarted"
                value={formData?.dateStarted || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Or Number</label>
              <input
                name="orNumber"
                value={formData?.orNumber || ""}
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full py-2 bg-red-500 text-white rounded"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateFormModal;
