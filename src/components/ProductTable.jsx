import { useSelector } from "react-redux"
import ProductRow from "./ProductRow"

const ProductTable = () => {
    const { productList } = useSelector((state) => state.btForm)
    console.log('Product List:', productList)
    
    return (
        <table className="table table-hover mt-5">
            <thead>
                <tr className="table-dark">
                    <th scope="col" className="text-warning">ID</th>
                    <th scope="col" className="text-warning">Image</th>
                    <th scope="col" className="text-warning">Name</th>
                    <th scope="col" className="text-warning">Price</th>
                    <th scope="col" className="text-warning">Description</th>
                    <th scope="col" colSpan={2} className="text-warning">Type</th>
                </tr>
            </thead>
            <tbody>
                {productList.map((product) => {
                    return (<ProductRow key={product.id} item={product}/>)
                })}
            </tbody>
        </table>
    )
}

export default ProductTable
