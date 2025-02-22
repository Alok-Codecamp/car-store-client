import React from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../redux/features/admin/orderManagement/orderManagementApi";

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const { data: paymentData, isLoading } = useVerifyPaymentQuery(
    searchParams.get("order_id")
  );
  console.log(paymentData);

  return <div>my-Order</div>;
};

export default OrderDetails;
