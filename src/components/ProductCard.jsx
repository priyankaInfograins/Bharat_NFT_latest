import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import featured from '../assets/img/featured.jpg'
import { Link } from 'react-router-dom'
import ethereum from '../assets/img/ether.svg'
import bnb from '../assets/img/bnb.png'
import { BiTimeFive } from 'react-icons/bi'

function ProductCard(props) {
    console.log("namenamename", props.username)
    // if (props.type === 2) {
    //     var link = `/User_profile?id=${props.id}`
    //     var name = props.userFullName
    //     var image = props.image
    //     var userProfile = props.image
    //     var username = props.username
    //     var price = ""
    // }
    // else {
    var link = `/prod_detail?id=${props.id}`
    var name = props.name
    var image = props.image
    var userProfile = props.userProfile
    var username = props.userFullName
    var price = props.price
    var category = props.category
    var auction_left_date = props.auction_left_date
    var mint_type = props.mint_type
    var chain  = props.chain
    console.log("chain", props.id)
    // }

    return (
        <>
         {/* <div className="card-container"> */}
         <Card className='mt-4'>
                <Link to={link}>
                    <div className="nft_img_div">
                        <Card.Img src={image} />
                    </div>

                    <div>
                        <Card.Body>
                            <div className="nft_main_div">
                                <div className="nft_left_div">
                                    <div className="category_name">{category}</div>
                                    <div className="nft_name"><h6>{name}</h6></div>
                                    <div className="buy_now_text">Buy now</div>
                                </div>
                                <div className="nft_right_div">
                                    <div className="price_text">Price</div>
                                    <div className="nft_price">
                                        {
                                            (()=>{
                                                if(chain === "BNB"){

                                                    return(
                                                        <img src={bnb} alt="img" className='img-fluid me-1' />
                                                    )
                                                }else{
                                                    return(
                                                        <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                    ) 
                                                }
                                            })()
                                        }
                                        <strong>{price}</strong>
                                    </div>
                                    <div className="nft_auction_time">
                                        {
                                            (()=>{
                                                if(mint_type === "2"){
                                                    return(
                                                        <BiTimeFive />
                                                    )
                                                }else{
                                                    return null
                                                }
                                            })()
                                        }
                                        <span>{auction_left_date}</span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </Link>
            </Card>
            {/* <div class="overlay">
                <div class="text">Hello World</div>
            </div>
         </div> */}

        </>


    )
}

export default ProductCard