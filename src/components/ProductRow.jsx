import { useDispatch } from "react-redux"
import { btFormAction } from "../store/BTForm/slice"

const ProductRow = ({item}) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <th scope="row">{item.id}</th>
            <td><img src={item.image} alt="img" style={{width: 100, height: 100}}/></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.desc}</td>
            <td>{item.type}</td>
            <td>
                <div className="d-flex gap-2">
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(btFormAction.deleteProduct(item))
                    }}>
                        <i className="fa-solid fa-trash text-white"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => {
                        dispatch(btFormAction.setProductEdit(item))
                    }}>
                        <i className="fa-solid fa-pen-to-square text-white"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ProductRow
