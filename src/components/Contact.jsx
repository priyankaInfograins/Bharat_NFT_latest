import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'

function Contact() {
  return (
    <div>
        <Header/>

        <section className='mx-auto my-5 px-5'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className='mb-5'>Contact Us</h2>

                        <div className='contact_form'>
                            <Form>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" size="md" className='send_btn'>
                                        Send
                                    </Button>
                                </div>
                               
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <Footer/>
    </div>
  )
}

export default Contact