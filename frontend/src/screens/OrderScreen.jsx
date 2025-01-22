import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  console.log("order id == ", orderId);

  const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order : {order._id}</h1>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default OrderScreen;
