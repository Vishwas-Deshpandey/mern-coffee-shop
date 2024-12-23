import React from 'react'
import Modal from '../../Components/Modal'

const MenuIngrediantsPage = () => {
    return (
        <div className='mt-2 container'>
            <div className="d-flex align-items-center justify-content-between py-4">
                <h3>Manage Ingrediant</h3>
                <div>
                    {/* Button trigger modal */}
                    <button type="button" className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal-0">
                        Add New Ingrediant
                    </button>
                    <Modal title={"Add New Ingrediant"} id={0} />
                </div>
            </div>
            <hr />


            <h5 className='my-4'>All Ingrediants</h5>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Ingrediant</th>
                        <th scope="col">Price</th>
                        <th scope="col">stock</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [1, 1, 1, 1].map((item, index) => (
                            <tr key={index}>
                                <th scope='row'>6759162696edd334cff59e30</th>
                                <td>Coconut Milk</td>
                                <td>15</td>
                                <td className={`text-${index % 2 == 0 ? 'success' : 'danger'}`}>
                                    {index % 2 == 0 ? 'in Stock' : 'out of Stock'}
                                </td>
                                <td>12/5/2024</td>
                                <td className='d-flex align-items-center gap-1'>

                                    <div>
                                        <button type="button" className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target={`#exampleModal-${index + 1}`}>
                                            Update
                                        </button>

                                        <Modal id={index + 1} title={'Update Category'} />

                                    </div>

                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default MenuIngrediantsPage