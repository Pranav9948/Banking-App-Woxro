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
import Shimmer from "../components/Shimmer/Shimmer";
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";


const WithDrawal = () => {
  const [withdrawAmount, setwithdrawAmount] = useState("");

  const userInfo = useSelector((state) => state?.userLogin?.userInfo._id);
  console.log("manh", userInfo);

  const dispatch=useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    submitWithdraw();
  };

  const {loading}=useSelector((state)=>state.general)

  const submitWithdraw = async () => {
    try {

        dispatch(showLoading())
      const { data } = await axios.post(
        "http://localhost:5000/api/user/withdraw",
        {withdrawAmount, userInfo },
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
              WithDraw Money
            </Card.Header>
            <Card.Body>
              <Card.Title className="pt-3 pb-3">Enter Amount</Card.Title>

              <Form onSubmit={submitHandler}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    placeholder="enter amount"
                    onChange={(e) => setwithdrawAmount(e.target.value)}
                  />
                </Form.Group>
                <Button className="bg-blue-600 mt-3 w-full" type="submit">
                  Withdraw
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default WithDrawal;
