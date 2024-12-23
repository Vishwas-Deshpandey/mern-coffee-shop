import React, { useEffect, useState } from 'react'
import { useChangeRestaurantStatusMutation, useGetMyRestaurantQuery } from '../../Redux/Api/restaurantApi';
import { useSelector } from 'react-redux';

const orderData = [

  {
    name: "Isha Verma",
    address: "12, Rajwada, Indore",
    mobile: "8765432109",
    order: "Espresso, Bagel",
    orderStatus: "Completed",
  },
  {
    name: "Rohan Gupta",
    address: "78, Sapna Sangeeta, Indore",
    mobile: "7654321098",
    order: "Latte, Sandwich",
    orderStatus: "Pending",
  },
  {
    name: "Priya Joshi",
    address: "32, Palasia Square, Indore",
    mobile: "6543210987",
    order: "Mocha, Muffin",
    orderStatus: "Cancelled",
  },
  {
    name: "Vikram Singh",
    address: "21, Old Palasia, Indore",
    mobile: "5432109876",
    order: "Americano, Cookies",
    orderStatus: "Completed",
  },
  {
    name: "Neha Kapoor",
    address: "9, Vijay Nagar, Indore",
    mobile: "4321098765",
    order: "Hot Chocolate, Donut",
    orderStatus: "Pending",
  },
];


const RestaurantDashboard = () => {

  const [isOpen, setIsOpen] = useState(false)

  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  const { data, isLoading } = useGetMyRestaurantQuery(token, { skip: !token });
  const [changeRestaurantStatus] = useChangeRestaurantStatusMutation();

  useEffect(() => {
    if (!isLoading) {
      // console.log(data?.myRestaurant?.isOpen)
      setIsOpen(data?.myRestaurant?.isOpen)
    }
  }, [data, isLoading])


  const handleStatusChange = (e) => {
    setIsOpen(e.target.checked);

    handleRestaurantStatus()
  }


  const handleRestaurantStatus = async () => {
    try {
      const restaurantData = {
        token,
        restaurantId: data?.myRestaurant?._id,
      }

      const response = await changeRestaurantStatus(restaurantData).unwrap();

      if (response) {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="card my-4 p-3 d-flex flex-column align-items-center justify-content-center mx-auto bg-body-secondary">
        <div className='position-relative' style={{ padding: "1.75rem" }}>
          <h2>{data?.myRestaurant?.name}</h2>
          <span className={`btn btn-${data?.myRestaurant?.isOpen ? 'success' : 'danger'} btn-sm position-absolute top-0 end-0`}>
            {data?.myRestaurant?.isOpen ? "Open" : "Closed"}
          </span>
          <p className="card-text text-center">🕘 8:00 Am - 11:00 Pm</p>
        </div>

        <div className="form-check form-switch d-flex align-items-center justify-content-between w-25">
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Change Restaurant Status</label>
          <input className="form-check-input" type="checkbox" value={isOpen} onChange={handleStatusChange} role="switch" id="flexSwitchCheckChecked" checked={isOpen} style={{ cursor: "pointer" }} />

        </div>
      </div>

      <div className="container-fluid">
        <h4>RECENT ORDERS</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Order</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orderData.map((order, id) => (
                <tr key={id}>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>{order.mobile}</td>
                  <td>{order.order}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))
            }

          </tbody>
        </table>



      </div>
    </div>
  )
}

export default RestaurantDashboard