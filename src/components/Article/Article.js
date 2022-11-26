import { ModalCreateProduct } from '../ModalCreateProduct/ModalCreateProduct';
import Product from '../Product/Product';
import './Article.css';
import { v4 as uuidv4 } from 'uuid';

const Article = ({ stock, filter, isLoged, user }) => {


    const renderBTNCrud = () => {

        if (user.admin) {
            return (
                <ModalCreateProduct />
            )
        }

    }

    return (

        <article className="mt-2 p-4  container bg-light">
            <div className="container">
                {renderBTNCrud()}
            </div>

            <div className="row pb-5 mb-4">
                {stock
                    .filter(items => {
                        if (!filter) return true;
                        else {
                            const itemName = items.name.toLowerCase();
                            return itemName.includes(filter.toLowerCase());
                        }
                    })
                    .map((product) => {
                        return (
                            <div key={uuidv4()} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                <Product product={product} />
                            </div>
                        )
                    })
                }
            </div>


        </article>

    )
}

export default Article