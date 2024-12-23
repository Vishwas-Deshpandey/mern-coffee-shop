import React from 'react'

const CategoryForm = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputText1" className="form-label">Category Name</label>
                <input type="text" className="form-control bg-dark text-white" id="exampleInputText1" aria-describedby="textHelp" />
            </div>
            <button type="submit" className="btn btn-dark border-secondary float-end">Submit</button>
        </form>

    )
}

export default CategoryForm