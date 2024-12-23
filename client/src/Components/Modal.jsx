import React, { useEffect } from 'react'
import CategoryForm from './Restaurant/Forms/CategoryForm'
import MenuIngrediantsForm from './Restaurant/Forms/MenuIngrediantsForm'
import { useLocation } from 'react-router-dom'

const Modal = ({ title, id = 0 }) => {
    const location = useLocation();


    return (
        <div>

            {/* Modal */}
            <div className="modal fade" id={`exampleModal-${id}`} tabIndex={-1} aria-labelledby={`exampleModalLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`exampleModalLabel-${id}`}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {
                                location.pathname === '/restaurant/menu/ingrediants' && (
                                    <MenuIngrediantsForm />
                                )

                            }

                            {
                                location.pathname === '/restaurant/category' && (
                                    <CategoryForm />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal