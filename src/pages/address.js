import "./address.css";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash
} from "react-icons/fa";

function Address() {
const userdata = localStorage.getItem("user");
const user = userdata ? JSON.parse(userdata):null;
  const [showForm, setShowForm] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false
  });

  useEffect (() =>{
    const fetchaddress = async () =>{
      if(!user) return;
      try{
        const res  = await axios.get(`http://localhost:5000/api/addresses/${user._id}`);
        setAddresses(res.data);
      }
      catch(err){
        console.log("address fetch error:",err);
      }
    };
    fetchaddress();
  },[]);
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

 const savedaddress = async (e) =>{
  e.preventDefault();
  console.log("save button");
  if(!user){
    alert("Please Login First");
    return;
  }
  try{
    const res = await axios.post("http://localhost:5000/api/addresses",{
      userId:user._id,
      label:form.label,
      streetAddress:form.street,
      city:form.city,
      state:form.state,
      zipCode:form.zip,
      isDefault:form.isDefault
    });
    console.log("response",res.data);
    setAddresses((prev) =>[res.data,
      ...prev
    ]);
    setForm({
      label:"",
      street:"",
      city:"",
      state:"",
      zip:"",
      isDefault:false
    });
    setShowForm(false);
  } catch(err){
    console.log("Address save error:",err);
  }
 };


 const makedefault = async (id) =>{
  try{
    const res  = await axios.put(`http://localhost:5000/api/addresses/${id}/default`);
    setAddresses((prev) =>
      prev.map((item) =>({
        ...item,
        isDefault:item._id === res.data._id
      }))
    );
  } catch (err){
    console.log("default addres error:",err);
  }
 };
const deleteAddress =async (id)=>{
  try{
    await axios.delete(`http://localhost:5000/api/addresses/${id}`);
    setAddresses((prev) =>
    prev.filter((item) =>
    item._id !==id));
  } catch (err){
    console.log("delete addresses error:",err);
  }
};

  return (
    <div className="addresses-page">

      <div className="addresses-header">

        <div>
          <h2>My Addresses</h2>
          <p>Manage your delivery addresses</p>
        </div>

        <button
          className="add-address-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Address
        </button>

      </div>


      {addresses.length === 0 ? (

        <div className="empty-address">

          <FaMapMarkerAlt className="empty-address-icon" />

          <h3>No addresses saved</h3>

          <p>
            Add an address for faster checkout
          </p>

          <button
            onClick={() => setShowForm(true)}
          >
            <FaPlus />
            Add Address
          </button>

        </div>

      ) : (

        <div className="address-grid">

          {addresses.map((item) => (

            <div className="address-card" key={item._id}>

              <div className="address-card-top">

                <div className="address-label">
                  <FaMapMarkerAlt />
                  <strong>{item.label}</strong>
                </div>
{item.isDefault ? (
  <span className="default-badge">
    Default
  </span>
) :(
  <button className="make-btn" onClick={()=>makedefault (item._id)}>Set as Default</button>
)}

              </div>

              <div className="address-details">

                <p>{item.streetAddress}</p>

                <p>
                  {item.city}, {item.state}
                </p>

                <p>
                  PIN Code: {item.zipCode}
                </p>

              </div>

              <div className="address-actions">

                {/* <button>
                  <FaEdit />
                  Edit
                </button> */}

                <button
                  onClick={() => deleteAddress(item._id)}
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {showForm && (

        <div
          className="address-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="address-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <h3>Add New Address</h3>

              <FaTimes
                onClick={() => setShowForm(false)}
                className="close-address"
              />

            </div>


            <form onSubmit={(e) => savedaddress(e)}>

              <label>Label</label>

              <input
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="Home, Work, etc."
                required
              />


              <label>Street Address</label>

              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />


              <div className="address-row">

                <div>
                  <label>City</label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>


                <div>
                  <label>State</label>

                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>

              </div>


              <label>Pin Code</label>

              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="Pin Code"
                required
              />


              <label className="default-check">

                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />

                Set as default

              </label>


              <button
                type="submit"
                className="save-address"
              >
                Save Address
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Address;