import { useSelector } from "react-redux"
import ProductRow from "./ProductRow"
import { useState } from "react"

const ProductTable = () => {
    const { productList } = useSelector((state) => state.btForm)
    const [searchValue, setSearchValue ] = useState("")
    console.log('Product List:', productList)
    
    return (
        <>
            <div className="mt-5 text-center p-relative">

                <input className="w-50 p-2 border border-secondary rounded" type="text" placeholder="search a product..." onChange={(ev) => {
                    setSearchValue(ev.target.value.toLowerCase())
                }}/>
            </div>
            <table className="table table-hover mt-2">
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
                        if (product.name.toLowerCase().indexOf(searchValue) !== -1) {
                            return (<ProductRow key={product.id} item={product}/>)
                        }
                        
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ProductTable
