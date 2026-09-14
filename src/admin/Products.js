import React, { useEffect, useState } from "react";
import axios from "axios";
import "./products.css";
import Potato from "../pages/images/potato.png";
import tomato from "../pages/images/tomato-15523.png";
import bhindi from "../pages/images/bhindi.png";
import Sidebar from "./Sidebar";

 const images = {
    "/products/bhindi.png": bhindi,
    "/products/potato.png": Potato,
    "/products/tomato-15523.png": tomato
  };
function Products() {
  const [showform,setshowform]=useState(false);
  const [isedit,setisedit]=useState(false);
  const [editid,seteditid]=useState("");
  const [products, setProducts] = useState([]);
  const [newproduct,setnewproduct]=useState ({
    name:"",
    price:"",
    category:"",
    description:"",
    stock:"",
    discount:"",
    rating:"",
    pack:"1 kg",
    available:true
  });
  const [imageFile,setImageFile]=useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };
const saveproduct = async () => {

    try {

        const formData = new FormData();


        formData.append(
            "name",
            newproduct.name
        );


        formData.append(
            "price",
            newproduct.price
        );


        formData.append(
            "category",
            newproduct.category
        );


        formData.append(
            "description",
            newproduct.description
        );


        formData.append(
            "stock",
            newproduct.stock
        );


        formData.append(
            "discount",
            newproduct.discount
        );


        formData.append(
            "rating",
            newproduct.rating
        );


        formData.append(
            "pack",
            newproduct.pack
        );


        formData.append(
            "available",
            newproduct.available
        );


        if (imageFile) {

            formData.append(
                "image",
                imageFile
            );

        }


        await axios.post(

            "http://localhost:5000/api/products",

            formData

        );


        alert(
            "Product Added Successfully"
        );


        setshowform(false);


        setnewproduct({

            name: "",
            price: "",
            category: "",
            description: "",
            stock: "",
            discount: "",
            rating: "",
            pack: "1 kg",
            available: true

        });


        setImageFile(null);


        fetchProducts();

    }

    catch (err) {

        console.log(err);

        alert(

            err.response?.data?.message ||

            "Failed to add product"

        );

    }

};

  const updateproduct = async () =>{
    try{
      await axios.put(`http://localhost:5000/api/products/${editid}`, newproduct);
      alert("Product updated Successfully");
      setshowform(false);
      setisedit(false);
      fetchProducts();
    } catch (err){
      console.log(err);
      alert("Update Failed");
    }
  };

  const deleteproduct = async (id)=>{
    const confirmdelete = window.confirm("Are you sure you want to delete this product?");
    if(!confirmdelete) return;
    try{
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product Deleted successfuly");
      fetchProducts();
    } catch(err){
      console.log(err.response?.data);
      console.log(err);
      alert(err.response?.data?.message ||"Failed to delete product");
    }
  };

  const editproduct  = (product) =>{
    setshowform(true);
    setisedit(true);
    seteditid(product._id);
    setnewproduct({
      name:product.name,
      price:product.price,
      category:product.category,
      description:product.description,
      stock:product.stock,
      discount:product.discount,
      rating:product.rating,
      pack:product.pack || "1 kg",
      available:product.available,
    });
  };

  const togglestock = async (product) =>{
    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`,{
        ...product,
        available: !product.available,
      });
      fetchProducts();
    } catch(err){
      console.log(err);
    }
  };
 

  return (
    <div className="admin-products">
      <Sidebar/>

      <h1>Manage Products</h1>

      <button onClick={()=>setshowform(true)}>
        + Add Product
      </button>
      {showform && (
        <div className="form-boxed">
          <h2>Add product</h2>
          <input placeholder="Product Name" value={newproduct.name} onChange={(e)=>setnewproduct({...newproduct,name:e.target.value})}/>

          <input placeholder="Price" value={newproduct.price} onChange={
            (e)=>setnewproduct({...newproduct,price:e.target.value})
          }/>

<div className="image-upload-box">

    <label>
        Product Image
    </label>


    <input
        type="file"
        accept="image/*"
        onChange={(e) => {

            setImageFile(
                e.target.files[0]
            );

        }}
    />


    {imageFile && (

        <p>

            Selected:
            {" "}
            {imageFile.name}

        </p>

    )}

</div>



         <select

    value={newproduct.category}

    onChange={(e) =>

        setnewproduct({

            ...newproduct,

            category: e.target.value

        })

    }

>

    <option value="">
        Select Category
    </option>

    <option value="vegetables">
        Vegetables
    </option>

    <option value="fruits">
        Fruits
    </option>

    <option value="organic">
        Organic
    </option>

    <option value="personal-care">
        Personal Care
    </option>

    <option value="pantry">
        Pantry Staples
    </option>

    <option value="bakery">
        Bakery
    </option>

    <option value="beverages">
        Beverages
    </option>

</select>

 <textarea placeholder="Description" value={newproduct.description} onChange={
  (e)=> setnewproduct({...newproduct,description:e.target.value,})
 }/>

          <input placeholder="Stock" value={newproduct.stock} onChange={
            (e)=>setnewproduct({...newproduct,stock:e.target.value})
          }/>

          <input

    type="number"

    placeholder="Discount %"

    value={newproduct.discount}

    onChange={(e) =>

        setnewproduct({

            ...newproduct,

            discount: e.target.value

        })

    }

/>


<input

    type="number"

    step="0.1"

    placeholder="Rating (Example: 4.5)"

    value={newproduct.rating}

    onChange={(e) =>

        setnewproduct({

            ...newproduct,

            rating: e.target.value

        })

    }

/>


<input

    placeholder="Pack / Weight (Example: 1 kg)"

    value={newproduct.pack}

    onChange={(e) =>

        setnewproduct({

            ...newproduct,

            pack: e.target.value

        })

    }

/>

          <button className="save-btnj" onClick={isedit ? updateproduct : saveproduct}> {isedit ? "Update Product" : "Save Product"}</button>
        </div>

        
      )}
  <div className="table-box">
      <table>
        <thead> 
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {
            products.map((product)=>(
              <tr key={product._id}>

                <td>
                <img

    src={`http://localhost:5000${product.image}`}

    width="60"

    height="60"

    alt={product.name}

/>
                </td>

                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{product.category}</td>

                <td>
                  <button className="edit-btny" onClick={()=>editproduct(product)}>Edit</button>
                  <button className="deletee-btn" onClick={()=>deleteproduct(product._id)}>Delete</button>
                  <button className={product.available ? "in-stock" : "out-stock"} onClick={()=>togglestock(product)}>{product.available ? "In Stock": "Out of Stock"}</button>
                </td>

              </tr>
            ))
          }
        </tbody>

      </table>
      </div>

    </div>
  );
}

export default Products;