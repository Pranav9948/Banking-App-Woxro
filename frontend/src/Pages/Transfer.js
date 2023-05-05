
import React, { useState } from "react";
import Navbars from "../components/Navbars";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";
import Shimmer from "../components/Shimmer/Shimmer";


const Transfer = () => {

    const [transferAmount, setTransferAmount] = useState("");
    const [email,setEmail]=useState('')
    const dispatch=useDispatch()

    const {loading}=useSelector((state)=>state.general)
    const userInfo = useSelector((state) => state?.userLogin?.userInfo._id);
    console.log("manh", userInfo);
  
    const submitHandler = (e) => {
      e.preventDefault();
      submitTransfer();
    };


    const submitTransfer = async () => {

        

        try {
            dispatch(showLoading())
          const { data } = await axios.post(
            "http://localhost:5000/api/user/transfer",
            {transferAmount, userInfo,email },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
              },
            }
          );

          dispatch(HideLoading())
    
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

      

  return (
    
    loading ? <Shimmer/> :
    <div>
      <Navbars />

      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Card className="w-3/5 mt-24">
            <Card.Header as="h2" className="font-bold text-3xl pt-4 pb-4 text-blue-600">
              Transfer Money
            </Card.Header>
            <Card.Body>
           

              <Form onSubmit={submitHandler}>


              <h3 className="font-bold text-2xl pt-3 pb-3">Email Address</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="email"
                    placeholder="enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>



                <h3 className="font-bold text-2xl pt-3 pb-3">Amount</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    placeholder="enter amount"
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </Form.Group>
                <Button className="bg-blue-600 mt-3 w-full" type="submit">
                  Transfer
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default Transfer




 







