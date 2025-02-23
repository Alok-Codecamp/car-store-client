import { useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../redux/features/admin/orderManagement/orderManagementApi";
import { Box } from "@mui/material";
import NavBar from "../../components/navBar/NavBar";

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  const { data: paymentData } = useVerifyPaymentQuery(
    searchParams.get("order_id")
  );
  console.log(paymentData);
  const orderData = paymentData?.data[0];

  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          boxShadow: "0px 0px 5px 1px lightgray",
          borderRadius: "10px",
          marginTop: "100px",
          width: "90%",
          marginLeft: "50px",
        }}
      >
        <h2
          style={{
            marginLeft: "50px",
          }}
        >
          Payment verification
        </h2>
        <Box
          sx={{
            display: { lg: "flex", md: "flex" },
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            <h4>Orderd Info</h4>
            <p> order id: {orderData?.order_id}</p>
            <p>invoice no: {orderData?.invoice_no}</p>
            <p>amount: {orderData?.amount}</p>
            <p>currency: {orderData?.currency}</p>
            <p>received amount: {orderData?.received_amount}</p>
            <p>Ordere time: {orderData?.date_time}</p>
          </Box>
          <Box
            sx={{
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            <h4>User Info</h4>
            <p>name: {orderData?.name}</p>
            <p>email: {orderData?.email}</p>
            <p>phone no: {orderData?.phone_no}</p>
            <p>address: {orderData?.address}</p>
          </Box>
          <Box
            sx={{
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            <h4>Bank Info</h4>
            <p>card holder name: {orderData?.card_holder_name}</p>
            <p>bank trx id: {orderData?.bank_trx_id}</p>
            <p>bank status: {orderData?.bank_status}</p>
            <p>method: {orderData?.method}</p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderDetails;
