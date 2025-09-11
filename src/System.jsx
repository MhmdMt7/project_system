import { useState } from "react";
import Swal from "sweetalert2";
import Galaxy from "./Galaxy";
export default function System() {
  const [phones, setPhones] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", qty: "" });
  // add new phone
  const addNewPhone = () => {
    let newPhoneName = prompt("Please Enter New Phone Name");
    let newPhonePrice = +prompt("Enter New Phone Price");
    let newQty = +prompt("Enter new phone Qty");
    let newObj = { name: newPhoneName, price: newPhonePrice, qty: newQty };
    setPhones([...phones, newObj]);
  };
  // reset
  const resetPhons = () => setPhones([]);
  // delete
  const deletePhone = (index) => {
    let copy = [...phones];
    copy.splice(index, 1);
    setPhones(copy);
  };
  // + Qty
  const increaseQty = (index) => {
    let copy = [...phones];
    copy[index].qty += 1;
    setPhones(copy);
  };
  // - Qty
  const decreaseQty = (index) => {
    let copy = [...phones];
    if (copy[index].qty > 1) {
      copy[index].qty -= 1;
      setPhones(copy);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Quantity cannot be less than 1",
        confirmButtonText: "OK",
        background: "#f8d7da",
      });
    }
  };
  // open modal for edit
  const openModal = (index) => {
    setEditIndex(index);
    setFormData(phones[index]);
    setIsOpen(true);
  };
  // save edit
  const saveEdit = () => {
    let copy = [...phones];
    copy[editIndex] = {
      ...formData,
      price: +formData.price,
      qty: +formData.qty,
    };
    setPhones(copy);
    setIsOpen(false);
  };

  return (
    <div className="system relative">
      <span className="absolute top-0 left-0 w-full h-screen -z-10">
        {/* Default prop values */}
        {/* <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Galaxy />
        </div> */}
        {/* // With custom prop values */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.8}
            hueShift={240}
          />
        </div>
      </span>
      <div className=" w-full h-screen p-10">
        <div className="container mx-auto flex flex-col justify-center">
          <div className="flex gap-5 items-center justify-between">
            <button onClick={addNewPhone} className="btn btn-primary">
              Add New Phone
            </button>
            <button onClick={resetPhons} className="btn btn-info">
              Reset
            </button>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="table  border-1 gap-16">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Item Qty</th>
                  <th>Item Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {phones.map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => increaseQty(index)}
                          className="btn btn-success"
                        >
                          +
                        </button>
                        <span>{el.qty}</span>
                        <button
                          onClick={() => decreaseQty(index)}
                          className="btn btn-secondary"
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>{el.price * el.qty}</td>
                    <td className="flex gap-5">
                      <button
                        onClick={() => deletePhone(index)}
                        className="btn btn-error"
                      >
                        Del
                      </button>
                      <button
                        onClick={() => openModal(index)}
                        className="btn btn-warning"
                      >
                        Up
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal for Edit Phone */}
          {isOpen && (
            <div className="fixed inset-0 bg-zinc-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-amber-400 p-6 rounded-2xl shadow-xl w-96">
                <h2 className=" text-xl text-neutral-950 font-bold mb-4 ">
                  Update Phone
                </h2>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Phone Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input input-bordered bg-amber-950 text-indigo-100 w-full"
                  />
                  <input
                    type="number"
                    placeholder="Phone Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="input input-bordered bg-amber-950 text-indigo-100 w-full"
                  />
                  <input
                    type="number"
                    placeholder="Phone Qty"
                    value={formData.qty}
                    onChange={(e) =>
                      setFormData({ ...formData, qty: e.target.value })
                    }
                    className="input input-bordered bg-amber-950 text-indigo-100 w-full"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button onClick={saveEdit} className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
