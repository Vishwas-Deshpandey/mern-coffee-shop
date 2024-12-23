import React from 'react'

const MenuIngrediantsForm = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputText1" className="form-label">Ingrediant Name</label>
                <input type="text" className="form-control bg-dark text-white" id="exampleInputText1" aria-describedby="textHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputNumber1" className="form-label ">Ingrediant Price</label>
                <input type="number" className="form-control bg-dark text-white" id="exampleInputNumber1" aria-describedby="numberHelp" />
            </div>

            <div className='mb-3'>

                <label htmlFor="exampleInputSelect" className="form-label">Stock Status</label>

                <select className="form-select bg-dark text-white" id='exampleInputSelect' aria-label="Default select example">
                    <option value={"in_stock"}>In Stock</option>
                    <option value={"out_of_stock"}>Out Of Stock</option>
                </select>
            </div>

            <button type="submit" className="btn btn-dark border-secondary float-end">Submit</button>
        </form>
    )
}

export default MenuIngrediantsForm