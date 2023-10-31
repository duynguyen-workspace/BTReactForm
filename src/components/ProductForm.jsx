import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { btFormAction } from "../store/BTForm/slice"
import cn from "classnames"

const ProductForm = () => {
    const {productEdit, productList} = useSelector((state) => state.btForm)
    const [formValue, setFormValue] = useState({
        id: '',
        image: '',
        name: '',
        price: '',
        type: '',
        desc: ''
    })
    const [formError, setFormError] = useState({
        id: '',
        image: '',
        name: '',
        price: '',
        type: '',
        desc: ''
    })

    console.log('formValue: ',formValue)

    // const handleFormValue = (event, name) => {
    //     //* console.log("event", event.target.value)
    //     setFormValue({
    //         ...formValue,
    //         [name]: event.target.value
    //     })
    // }

    const validate = (name, value) => {
        if (value.trim() === "") {
            return `${name} không được để trống`
        }

        switch (name) {
            case 'id':
                if (!productEdit) {
                    const indexFound = productList.findIndex((product) => product.id == value)
                    // console.log("indexFound",indexFound)

                    if (indexFound != -1) {
                        return `ID đã tồn tại`
                    }
                }
                break;
            case 'image':
                if (value.match(new RegExp("^https?://\S+\.(?:png|jpe?g|gif|bmp|tiff?|webp)?$"))) {
                    return "Vui lòng nhập đúng đường dẫn hình ảnh"
                }
                break;
            case 'name':
                break;
            case 'price':
                if (value.match(new RegExp("^[0-9]*$"))) {
                    return "Giá tiền không hợp lệ (vd hợp lệ: 150$)"
                }
                break;
            default:
                break;
        }
    }

    //? currying function 
    const handleFormValue = (name) => (event) => {
        //* kiểm tra đầu vào dữ liệu
        // if (event.target.value == "") {
        //     setFormError({...formError, [name]: `${name} không được để trống`})
        // }
        setFormError({...formError, [name]: validate(name, event.target.value)})

        //* console.log("event", event.target.value)
        setFormValue({
            ...formValue,
            [name]: event.target.value
        })
    }

    const handleResetFormValue = () => {
        setFormValue({
            id: '',
            image: '',
            name: '',
            price: '',
            type: '',
            desc: ''
        })
    }

    const handleResetFormError = () => {
        setFormError({
            id: '',
            image: '',
            name: '',
            price: '',
            type: '',
            desc: ''
        })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (productEdit) {
            //* console.log('productEdit', productEdit)
            // Reset form error
            handleResetFormError()
            setFormValue(productEdit)
        }
    }, [productEdit])

    return (
        <div className="container">
            <form id="btForm" className="row" onSubmit={(ev) => {
                //* prevent browser reload
                ev.preventDefault()

                const validationError = {}

                Object.keys(formValue).forEach((name) => {
                    const error = validate(name, formValue[name])
                    if (error && error.length > 0) {
                        validationError[name] = error;
                    }
                })

                if (Object.keys(validationError).length > 0) {
                    setFormError({...validationError})
                    return;
                }

                if (productEdit) {
                    dispatch(btFormAction.updateProduct(formValue))
                } else {
                    dispatch(btFormAction.createProduct(formValue))
                    handleResetFormValue()
                }
            }}>
                <h2 className="p-3 bg-dark text-warning">Product Info</h2>
                <div className="col-6">
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">ID</p>
                        <input type="text" className="form-control" onChange={
                            handleFormValue('id')
                        } value={formValue.id} disabled={productEdit}/>
                        {formError.id && <p><small className="text-danger fw-medium">{formError.id}</small></p>}
                    </div>
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">Name</p>
                        <input type="text" className="form-control" onChange={
                            handleFormValue('name')
                        } value={formValue.name}/>
                        {formError.name && <p><small className="text-danger fw-medium">{formError.name}</small></p>}
                    </div>
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">Price</p>
                        <input type="text" className="form-control" onChange={
                            handleFormValue('price')
                        } value={formValue.price}/>
                        {formError.price && <p><small className="text-danger fw-medium">{formError.price}</small></p>}
                        
                    </div>
                    
                </div> 
                <div className="col-6">
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">Image</p>
                        <input type="text" className="form-control" onChange={
                            handleFormValue('image')
                        } value={formValue.image}/>
                        {formError.image && <p><small className="text-danger fw-medium">{formError.image}</small></p>}
                    </div>
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">Product Type</p>
                        <input type="text" className="form-control" onChange={
                            handleFormValue('type')
                        } value={formValue.type}/>
                        {formError.type && <p><small className="text-danger fw-medium">{formError.type}</small></p>}
                    </div>
                    <div className="mt-3">
                        <p className="fs-6 fw-medium m-0">Description</p>
                        <div>
                            <textarea className="form-control" placeholder="Leave a description here" id="" onChange={
                                handleFormValue('desc')
                            } value={formValue.desc}/>
                            {formError.desc && <p><small className="text-danger fw-medium">{formError.desc}</small></p>}
                        </div>

                    </div>
                </div> 
            </form>

            <div className="d-flex gap-3 mt-3">
                <button className={cn('btn btn-primary', {
                    disabled: productEdit
                })} form="btForm">Create</button>
                <button className={cn('btn btn-success', {
                    disabled: !productEdit
                })} form="btForm">Update</button>
                <button className='btn btn-warning' onClick={() => {
                    handleResetFormValue()
                    handleResetFormError()
                    dispatch(btFormAction.resetProductEdit(''))
                }}>Reset</button>

            </div>
        </div>
    )
}

export default ProductForm
