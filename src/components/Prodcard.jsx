import React from 'react'
import './prod.css'
import { useNavigate } from 'react-router-dom'

function Prodcard({data}) {
  console.log(data)

  const navigate=useNavigate()

  const handle = async (id) => {
    console.log(id)
    sessionStorage.setItem("pid", JSON.stringify(id))
    navigate('/viewprod')
  }

  return (
     <div>
            <div class="product-cardd ms-2 me-2">
              <img src={data.image} onClick={() => handle(data._id)} alt="Product Image" className="product-image" />
                <div class="product-info">
                    <h3 class="product-title">{data.title}</h3>
                    <p class="product-price">₹{data.price}</p>
                </div>
            </div>

            


        </div>
  )
}

export default Prodcard