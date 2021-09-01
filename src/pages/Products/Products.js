import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { fetchProducts } from 'services/services';

const Products = () => {
    const [productsList, setProductsList] = React.useState();
    const history = useHistory()
    const fetchProductsList = async () => {
        const res = await fetchProducts()
        const data = await res.json()
        if (res.ok) {
            setProductsList(data)
        }
    }

    React.useEffect(() => {
        fetchProductsList();
    }, [])

    return (
        <div>
            <div className="card-header"> Products List </div>
            <div className="card-body pt-3">
                <div className="row">
                    {
                        productsList?.map((product, index) => (
                            <div className="col-md-4 product" key={index}>
                                <Link to="/" className="text-black">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="img-card-top">
                                                <img src="https://worktrialf.herokuapp.com/assets/images/product.jpg" alt="ProductImage" className="w-100" />
                                            </div>
                                            <div className="text-center pt-4">
                                                <h5 className="text-black">{product.label}</h5>
                                                <p style={{ color: "#333" }}>{product.description}</p>
                                                <p style={{ color: "#777", textDecoration: 'line-through' }}>${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div class="card-footer">
                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Back</button>
            </div>
        </div>
    )
}

export default Products
