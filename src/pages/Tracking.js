import "./tracking.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import {
  FaMapMarkerAlt,
  FaCheck,
  FaBox,
  FaTruck,
  FaMotorcycle,
  FaHome,
  FaClock,
} from "react-icons/fa";


function Tracking() {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
const [error,setError]=useState("");
  const mapRef = useRef(null);



  useEffect(() => {

const fetchOrder = async () => {

    try {

        console.log("Tracking Order ID:", orderId);

        const res = await axios.get(
            `https://veggiehub-1037.onrender.com/api/orders/tracking/${orderId}`
        );

        console.log("Tracking Response:", res.data);

        if (res.data.success) {
            setOrder(res.data.order);
        }

    } catch (err) {
console.log("full error",err);
console.log("status",err.response?.status);
console.log("data",err.response?.data);
console.log("mesage",err.message);
        setError("Unable to load order details");

    } finally {

        setLoading(false);

    }

};


    if (orderId) {

      fetchOrder();

    }

  }, [orderId]);


  useEffect(() => {

    if (!mapRef.current) return;


    const map = new Map({

      target: mapRef.current,

      layers: [

        new TileLayer({

          source: new OSM(),

        }),

      ],

      view: new View({

        center: fromLonLat([
          77.2674,
          30.1290,
        ]),

        zoom: 13,

      }),

    });


    setTimeout(() => {

      map.updateSize();

    }, 500);


    return () => {

      map.setTarget(undefined);

    };


  }, []);


  console.log("order",order);
  console.log("loading",loading);
  console.log("error",error);

  if (loading) {

    return (

      <div className="tracking-loading">

        Loading your order...

      </div>

    );

  }

  if(error){
    return(
      <div className="tracking-errore">{error}</div>
    );
  }

  if (!order) {

    return (

      <div className="tracking-error">

        Unable to load order details

      </div>

    );

  }


  const items =
    order.items && order.items.length > 0

      ? order.items

      : [];


  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString(
    "en-IN",
    {

      day: "numeric",

      month: "long",

      year: "numeric",

    }
  );


  const steps = [

    {
      name: "Placed",
      icon: <FaClock />,
    },

    {
      name: "Confirmed",
      icon: <FaCheck />,
    },

    {
      name: "Assigned",
      icon: <FaMotorcycle />,
    },

    {
      name: "Packed",
      icon: <FaBox />,
    },

    {
      name: "Out for Delivery",
      icon: <FaTruck />,
    },

    {
      name: "Delivered",
      icon: <FaHome />,
    },

  ];


  const currentStep =
    order.trackingStep || 1;


  return (

    <div className="tracking-page-new">

<h1 style={{fontSize:"5000px"}}>tracking page working</h1>
      <div className="order-header-new">

        <div>

          <h2>

            Order #

            {order.orderId}

          </h2>

          <p>

            Placed on {orderDate}

          </p>

        </div>


        <span className="status-badge-new">

          {order.status || "Placed"}

        </span>

      </div>




      <div className="tracking-map-wrapper">

        <div
          ref={mapRef}
          className="tracking-map-new"
        />

        <div className="map-waiting">

          <FaMapMarkerAlt />

          <p>

            Waiting for delivery partner location...

          </p>

        </div>

      </div>


      <div className="tracking-section">

        <h3>

          Delivery Progress

        </h3>


        <div className="progress-list-new">

          {

            steps.map(
              (step, index) => (

                <div
                  className="progress-row-new"
                  key={index}
                >


                  <div className="progress-left-new">


                    <div
                      className={
                        index < currentStep

                          ? "progress-circle-new active"

                          : "progress-circle-new"
                      }
                    >

                      {step.icon}

                    </div>


                    {

                      index !==
                        steps.length - 1 && (

                        <div
                          className={
                            index < currentStep - 1

                              ? "progress-line-new active-line"

                              : "progress-line-new"
                          }
                        />

                      )

                    }


                  </div>


                  <div
                    className={
                      index < currentStep

                        ? "progress-text-new active-text"

                        : "progress-text-new"
                    }
                  >

                    <h4>

                      {step.name}

                    </h4>


                    {

                      index === 0 && (

                        <p>

                          Order placed successfully

                        </p>

                      )

                    }

                  </div>


                </div>

              )
            )

          }

        </div>

      </div>


      <div className="tracking-section">

        <h3 className="section-title-icon">

          <FaMapMarkerAlt />

          Delivery Address

        </h3>


        <div className="address-display">

          <h4>

            Home

          </h4>

          <p>

            {order.address}

          </p>

        </div>

      </div>


      <div className="tracking-section items-section">

        <h3>

          Items ({items.length})

        </h3>


        <div className="tracking-items">

          {

            items.map(
              (item, index) => (

                <div
                  className="tracking-item"
                  key={index}
                >


                  <div className="tracking-item-left">


                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    <div>

                      <h4>

                        {item.name}

                      </h4>


                      <p>

                        x{item.qty}

                      </p>

                    </div>


                  </div>


                  <strong>

                    ₹

                    {item.price * item.qty}

                  </strong>


                </div>

              )
            )

          }

        </div>


        <div className="bill-summary">


          <div>

            <span>

              Subtotal

            </span>

            <strong>

              ₹{order.total}

            </strong>

          </div>


          <div>

            <span>

              Delivery

            </span>

            <strong>

              Free

            </strong>

          </div>


          <div>

            <span>

              Tax

            </span>

            <strong>

              ₹0

            </strong>

          </div>


          <hr />


          <div className="final-total">

            <h3>

              Total

            </h3>

            <h3>

              ₹{order.total}

            </h3>

          </div>


        </div>

      </div>


    </div>

  );

}


export default Tracking;