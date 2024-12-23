import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useCreateNewMenuMutation, useGetAllMenuIngrediantsQuery, useGetAllRestaurantCategoryQuery } from '../../Redux/Api/menuApi';




const AddMenu = () => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [menuIngrediants, setMenuIngrediants] = useState([])



    const { user, restaurantId } = useSelector((store) => store.auth);
    const token = user?.token

    const { data: allCategories } = useGetAllRestaurantCategoryQuery({
        token,
        restaurantId
    }, { skip: !token || !restaurantId })

    const { data: allMenuIngrediants } = useGetAllMenuIngrediantsQuery({
        token,
        restaurantId
    }, { skip: !token || !restaurantId })

    const [createMenu] = useCreateNewMenuMutation();


    // useEffect(() => {
    //     if (allMenuIngrediants && allMenuIngrediants?.menuIngrediants?.length > 0) {
    //         console.log(allMenuIngrediants)
    //     }
    // }, [allMenuIngrediants])


    const handleSelect = (e) => {

        const selectedValues = e.target.selectedOptions;
        let arrayOfValues = [];

        for (let selectedValue of selectedValues) {
            arrayOfValues.push(selectedValue.value)
        }


        setMenuIngrediants([...new Set([...menuIngrediants, ...arrayOfValues])]);
    }

    const handleRemoveIngrediant = (idx) => {
        let values = [...menuIngrediants];

        values.splice(idx, 1);

        setMenuIngrediants(values)
    }



    const handleFormSubmission = async (e) => {
        e.preventDefault();


        const formData = new FormData();

        formData.append('name', name)
        formData.append('categoryId', categoryId)
        formData.append('price', price)
        formData.append('menuImage', file)
        formData.append('description', description)

        for (let ingrediant of menuIngrediants) {
            formData.append('menuIngrediants', ingrediant);
        }


        // formData.forEach(value => {
        //     console.log(value)
        // })

        const data = {
            token,
            formData
        }

        try {
            const response = await createMenu(data).unwrap();

            if (response) {
                alert(response?.message);
                console.log(response?.message);

                setName('')
                setPrice(0)
                setDescription('')
                setCategoryId('')
                setFile(null)
                setMenuIngrediants([])
            }
        } catch (error) {
            console.log('Form Error from FrontEnd: ', error)
        }
    }

    return (
        <div className='container mt-4'>
            <h3>ADD A NEW MENU</h3>
            <hr />

            <form className='my-4' onSubmit={handleFormSubmission}>
                <div className="row my-2">
                    <div className="col-md-8">

                        {/* menu name field */}
                        <div className="mb-3">
                            <label htmlFor="menuName" className="form-label">Your Menu Name</label>
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="menuName" aria-describedby="menuNameHelp" placeholder='e.g. Coffee Name' autoComplete='off' required />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                {/* menu category field */}
                                <div className="mb-3">
                                    <label htmlFor="selectCategory" className="form-label">Choose Coffee Category</label>

                                    <select className="form-select" aria-label="Default select example" name='categoryId' onChange={(e) => setCategoryId(e.target.value)} id='selectCategory'>
                                        {
                                            allCategories && allCategories?.categories?.length > 0 && (
                                                allCategories?.categories?.map((coffee, id) => (
                                                    <option key={coffee?._id} value={coffee?._id}>{coffee?.name}</option>
                                                ))
                                            )
                                        }

                                    </select>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="menuPrice" className="form-label">Your Menu Price</label>
                                    <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="menuPrice" aria-describedby="menuPriceHelp" placeholder='e.g. 250' autoComplete='off' required />
                                </div>
                            </div>
                        </div>



                        {/* menu file field */}
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Choose Menu Image</label>
                            <input className="form-control" name='menuImage' type="file" onChange={(e) => { setFile(e.target.files[0]) }} id="formFile" />
                        </div>

                        {/* menu description */}
                        <div className="mb-3">
                            <label htmlFor="addDescription" className="form-label">Add Menu Description</label>
                            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} name='description' id="addDescription" aria-describedby="menuNameHelp" rows={4} />
                        </div>


                        {/* Ingrediant name field */}

                        <div className="mb-3">
                            <div className='my-2'>
                                {
                                    menuIngrediants.map((ingrediant, id) => (
                                        <button type='button' key={id} className="btn btn-sm btn-outline-danger rounded-pill border-secondary cursor-pointer me-1" onClick={() => handleRemoveIngrediant(id)}>
                                            {ingrediant}
                                        </button>
                                    ))
                                }
                            </div>

                            <div>
                                <label htmlFor="selectIngrediant">select ingrediant</label>
                                <select name="ingrediant" id="selectIngrediant" className='form-select' onChange={handleSelect} multiple>
                                    {
                                        allMenuIngrediants && allMenuIngrediants?.menuIngrediants?.length > 0 && (
                                            allMenuIngrediants?.menuIngrediants?.map((ingrediant, i) => (
                                                <option key={ingrediant?._id} value={ingrediant?.name}>{ingrediant?.name}</option>
                                            ))
                                        )

                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex  justify-content-center">
                        <div className="card border-0 p-2" style={{ width: "15rem", height: "15rem" }}>
                            <img src={!file ? "/vite.svg" : URL.createObjectURL(file)} className="card-img-top w-100 h-100" alt="..." />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-2">Add New Menu In Restaurnat</button>

            </form>
        </div>
    )
}

export default AddMenu