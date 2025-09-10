import { useState } from "react";
import Swal from "sweetalert2";
export default function App() {
  const [phones, setPhones] = useState([

  ]);

  // add new phone
  const addNewPhone = () => {
    let newPhoneName = prompt("Please Enter New Phone Name");
    let newPhonePrice = +prompt("Enter New Phone Price");
    let newQty = +prompt("Enter new phone Qty");
    let newObj = {
      name: newPhoneName,
      price: newPhonePrice,
      qty: newQty,
    };
    let copy = [...phones];
    copy.push(newObj);
    setPhones(copy);
  };
  // reset
  const resetPhons = () => {
    let newArr = [];
    setPhones(newArr);
  };
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
      });
    }
  };

  // map()
  return (
    <div className="App w-full h-screen  p-10">
      <div className=" container mx-auto flex flex-col  justify-center">
        <div className="flex gap-5 items-center justify-between">
          <button
            onClick={() => {
              addNewPhone();
            }}
            className="btn btn-primary "
          >
            Add New Phone
          </button>
          <button
            onClick={() => {
              resetPhons();
            }}
            className="btn btn-primary "
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="table gap-16">
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
              {phones.map((el, index) => {
                return (
                  <tr>
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
                        onClick={() => {
                          deletePhone(index);
                        }}
                        className="btn btn-error"
                      >
                        Del
                      </button>
                      <button class="btn btn-primary">up</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
