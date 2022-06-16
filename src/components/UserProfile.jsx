import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Container,Row, Col,Tabs,Tab,Card} from 'react-bootstrap'
import ProfileImg from '../assets/img/Profile.png'
import { FaRegCopy } from 'react-icons/fa'
import { FaGlobe } from 'react-icons/fa'
import { FaGithubAlt } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaSnapchatGhost } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaCommentDots } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import ProductCard from './ProductCard'
import axios from 'axios'
import {useSearchParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function UserProfile() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userData, setuserData] = useState("")
        // const searchParams = useSearchParams();
        const [onSale, setOnSaleData] = useState([])
        const [activity, setActivity] = useState([])
        const [owned, setOwned] = useState([])
    console.log("userData", userData);
    
    async function getUserProfile(){
        const id =  searchParams.get("id") 
        // console.log("id", id);
        // var id = '0X9F1F7D979A424800F35325BF7857BF2F20BC0479'
    
        // var data = await axios.get(`http://148.72.244.170:5001/user/getUserByID?id=${id}`)

        var creators = await axios.get(`${BASE_URL}/getTopCreatorDetail?user_id=${id}`)

        console.log('data creators',creators.data)
        setuserData(creators.data.result)
        console.log("gfdgggggggggggggg",userData)
        setOnSaleData(creators.data.result.on_sale)
        setActivity(creators.data.result.activity)
        setOwned(creators.data.result.owned)
    }
    useEffect(()=>{
        getUserProfile()
    }, [])
   
      // =============On Sell pagination start===============
  const [currentItemsActivity, setCurrentItemsActivity] = useState(null);
  const [pageCountActivity, setPageCountActivity] = useState(0);

  const [itemOffsetActivity, setItemOffsetActivity] = useState(0);
  const itemsPerPageActivity = 6
  useEffect(() => {

    const endOffsetActivity = itemOffsetActivity + itemsPerPageActivity;

    setCurrentItemsActivity(activity.slice(itemOffsetActivity, endOffsetActivity));
    setPageCountActivity(Math.ceil(activity.length / itemsPerPageActivity));
  }, [itemOffsetActivity, itemsPerPageActivity, activity]);

  const handlePageClickActivity = (event) => {
    const newOffsetActivity = (event.selected * itemsPerPageActivity) % activity.length;
    setItemOffsetActivity(newOffsetActivity);
  };
  // =============On Sell pagination end===============

  // =============Activity pagination start===============
  const [currentItemsOnSale, setCurrentItemsOnSale] = useState(null);
  const [pageCountOnSale, setPageCountOnSale] = useState(0);

  const [itemOffsetOnSale, setItemOffsetOnSale] = useState(0);
  const itemsPerPageOnSale = 6
  useEffect(() => {

    const endOffsetOnSale = itemOffsetOnSale + itemsPerPageOnSale;

    setCurrentItemsOnSale(onSale.slice(itemOffsetOnSale, endOffsetOnSale));
    setPageCountOnSale(Math.ceil(onSale.length / itemsPerPageOnSale));
  }, [itemOffsetOnSale, itemsPerPageOnSale, onSale]);

  const handlePageClickOnSale = (event) => {
    const newOffsetOnSale = (event.selected * itemsPerPageOnSale) % onSale.length;
    setItemOffsetOnSale(newOffsetOnSale);
  };
  // =============Activity pagination end===============

  // =============Owned pagination start===============
  const [currentItemsOwned, setCurrentItemsOwned] = useState(null);
  const [pageCountOwned, setPageCountOwned] = useState(0);

  const [itemOffsetOwned, setItemOffsetOwned] = useState(0);
  const itemsPerPageOwned = 6
  useEffect(() => {

    const endOffsetOwned = itemOffsetOwned + itemsPerPageOwned;

    setCurrentItemsOwned(owned.slice(itemOffsetOwned, endOffsetOwned));
    setPageCountOwned(Math.ceil(owned.length / itemsPerPageOwned));
  }, [itemOffsetOwned, itemsPerPageOwned, owned]);

  const handlePageClickOwned = (event) => {
    const newOffsetOwned = (event.selected * itemsPerPageOwned) % owned.length;
    setItemOffsetOwned(newOffsetOwned);
  };
  // =============Owned pagination end===============

  return (
      <div>
        <Header/>
            <section className='profile'>
                <Container>
                    <Row>
                          <Col lg={12}>
                              <Link to='/' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon' />  Go Back</Link>
                          </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <div className='profile-detail text-center'>
                                <img src={userData.profileImage} alt="profile" className='img-fluid'/>

                                <div className='mt-4 heading-name'>
                                    <h1>{userData.name}</h1>
                                    <h2>{userData.username}</h2>
                                </div>

                                <div className='edit-profile mt-4'>
                                    <ul className='list-unstyled d-flex justify-content-between align-items-center'>
                                        <li><a href="#">Follow</a></li>
                                        <li><strong>{userData.followingCount}</strong> <span className='d-block'>Following</span></li>
                                        <li><strong>{userData.followerCount}</strong> <span className='d-block'>Followers</span></li>
                                        
                                    </ul>
                                </div>

                                <div className='Bio mt-4 text-start'>
                                    <h6><strong>Bio</strong></h6>
                                    <hr></hr>
                                    <span>{userData.bio}</span>
                                </div>

                                <div className='link text-start mt-4'>
                                    <h6><strong>Links</strong></h6>

                                    <ul className='list-unstyled mt-3'>
                                        <li> <FaGlobe/> {userData.links}</li>
                                        <li> <FaGithubAlt/> {userData.discord_link}</li>
                                        <li> <FaFacebook/> {userData.facebook_link}</li>
                                        <li> <FaSnapchatGhost/>{userData.snapchat} </li>
                                        <li> <FaTiktok/>{userData.tiktok_link} </li>
                                        <li> <FaCommentDots/> {userData.twich_link}</li>
                                        <li> <FaYoutube/>{userData.youtube_link} </li>
                                    </ul>
                                </div>

                                <div>
                                    <ul className='list-unstyled d-flex justify-content-between border-top border-bottom py-2'>
                                       {/* <li><strong>Joined</strong></li>
                                        <li><strong>{(userData.createdAt)}</strong></li> */}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8}>
                            <Tabs defaultActiveKey="sale" id="uncontrolled-tab-example" className="mb-3 cus-tabs">
                                <Tab eventKey="sale" title="On sale">
                                    <Row>
                                    { (
                                                currentItemsOnSale ?

                                                currentItemsOnSale.map((e) => {
                                                        var link = `/prod_detail?id=${e.id}`
                                                        return (
                                                            <Col lg={4} md={6}>
                                                                
                                                                <Card className='mt-4'>
                                                                        <Link to={link}>
                                                                            <div className="nft_img_div">
                                                                                <Card.Img src={e.image} />
                                                                            </div>

                                                                            <div>
                                                                                <Card.Body>
                                                                                    <div className='user-section d-flex justify-content-between'>
                                                                                            <div>{e.name}</div>
                                                                                            <h5>{e.nft_price}</h5>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </div>
                                                                        </Link>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })

                                                    :
                                                    <div className='filter_data_card text-center py-5'>
                                                    <p>No NFT's Available</p>
                                                </div>
                                            )

                                       } 
                                        
                                       
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                        {
                                                (() => {
                                                    
                                                
                                                    if (onSale.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickOnSale}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountOnSale}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }

                                                })()
                                            }
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="activity" title="Activity">
                                    <Row>
                                    { (
                                                currentItemsActivity ?

                                                currentItemsActivity.map((e) => {
                                                        var link = `/prod_detail?id=${e.id}`
                                                        return (
                                                            <Col lg={4} md={6}>
                                                                
                                                                <Card className='mt-4'>
                                                                        <Link to={link}>
                                                                            <div className="nft_img_div">
                                                                                <Card.Img src={e.image} />
                                                                            </div>

                                                                            <div>
                                                                                <Card.Body>
                                                                                    <div className='user-section d-flex justify-content-between'>
                                                                                            <div>{e.name}</div>
                                                                                            <h5>{e.nft_price}</h5>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </div>
                                                                        </Link>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })

                                                    :
                                                    <div className='filter_data_card text-center py-5'>
                                            <p>No NFT's Available</p>
                                        </div>
                                            )

                                       }
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                        {
                                                (() => {
                                                   
                                                    if (activity.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickActivity}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountActivity}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="owned" title="Owned">
                                    <Row>
                                    { (
                                                currentItemsOwned ?

                                                currentItemsOwned.map((e) => {
                                                        var link = `/prod_detail?id=${e.id}`
                                                        return (
                                                            <Col lg={4} md={6}>
                                                                
                                                                <Card className='mt-4'>
                                                                        <Link to={link}>
                                                                            <div className="nft_img_div">
                                                                                <Card.Img src={e.image} />
                                                                            </div>

                                                                            <div>
                                                                                <Card.Body>
                                                                                    <div className='user-section d-flex justify-content-between'>
                                                                                            <div>{e.name}</div>
                                                                                            <h5>{e.nft_price}</h5>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </div>
                                                                        </Link>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })

                                                    :
                                                
                                                    <div className='filter_data_card text-center py-5'>
                                                    <p>No NFT's Available</p>
                                                </div>
                                                  
                                            )

                                       } 
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                        {
                                                (() => {
                                                   
                                                    if (owned.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickOwned}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountOwned}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </section>
        <Footer/>
      </div>
    
  )
}

export default UserProfile