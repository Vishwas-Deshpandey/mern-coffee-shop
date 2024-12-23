import React from 'react'

const orders = [
    { title: "tshirt", price: 1450, orderDate: "12/5/2024", status: "PENDING" },
    { title: "shirt", price: 850, orderDate: "12/5/2024", status: "DELIVERED" },
    { title: "watch", price: 1459, orderDate: "12/5/2024", status: "PLACED" },
    { title: "mobile", price: 1299, orderDate: "12/5/2024", status: "CANCELLED" },
  ]

const UserDashboard = () => {
    return (
        <div className='container'>

            <div className='my-4'>
                <h4>Overview</h4>
                <div className="shadow-sm border rounded p-4 d-flex align-items-center gap-5">
                    {/* 1 */}
                    <div className="card rounded-circle d-flex align-items-center justify-content-center flex-column border-primary border-4" style={{ width: "120px", height: "120px" }}>
                        <h4>18</h4>
                        <small style={{ fontSize: "12px" }}>Total Orders</small>
                    </div>

                    {/* 2 */}
                    <div className="card rounded-circle d-flex align-items-center justify-content-center flex-column border-danger border-4" style={{ width: "120px", height: "120px" }}>
                        <h4>8</h4>
                        <small style={{ fontSize: "12px" }}>Cancelled Orders</small>
                    </div>

                    {/* 3 */}
                    <div className="card rounded-circle d-flex align-items-center justify-content-center flex-column border-warning border-4" style={{ width: "120px", height: "120px" }}>
                        <h4>4</h4>
                        <small style={{ fontSize: "12px" }}>Pending Orders</small>
                    </div>

                    {/* 3 */}
                    <div className="card rounded-circle d-flex align-items-center justify-content-center flex-column border-success border-4" style={{ width: "120px", height: "120px" }}>
                        <h4>11</h4>
                        <small style={{ fontSize: "12px" }}>Delivered Orders</small>
                    </div>



                </div>
            </div>

            <div>
                <h4>Recent Orders</h4>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.title}</td>
                                    <td>{order.price}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UserDashboard