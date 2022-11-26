import { ModalCreateProduct } from '../ModalCreateProduct/ModalCreateProduct';
import Product from '../Product/Product';
import './Article.css';
import { v4 as uuidv4 } from 'uuid';

const Article = ({ stock, filter, isLoged, user }) => {


    const renderBTNCrud = () => {
        if (isLoged) {
            if (user.admin) {
                return (
                    <ModalCreateProduct />
                )
            } else {
                return (
                    <>
                        <div onClick={() => console.log("goli")} className='pointer bg-dark mb-4'>
                            <div className='text-center p-3'>
                                <h3 className='text-decoration-none text-info display-5'>Welcome {user.name}!</h3>
                                <h3 className='text-decoration-none text-light display-6'>Would you like to upload a new product? click here!</h3>
                            </div>
                        </div>

                    </>
                )
            }
        }
    }

    return (

        <article className="mt-2 p-4  container bg-light">
            <div className="container">
                <div className=''>{renderBTNCrud()}</div>
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
                    .map((product, indice) => {
                        return (    
                            <div key={uuidv4()} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <Product product={product} indice={indice} />
                            </div>
                        )
                    })
                }
            </div>


        </article>

    )
}

export default Article