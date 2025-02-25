import { Button, MenuItem, Select } from "@mui/material";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/admin/orderManagement/orderManagementApi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactNode, useState } from "react";

interface Column {
  id:
    | "orderId"
    | "car"
    | "quantity"
    | "status"
    | "deliveryDate"
    | "totalPrice"
    | "transaction"
    | "userId"
    | "deleteOrder";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "userId",
    label: "User Id",
    minWidth: 40,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "orderId",
    label: "Order Id",
    minWidth: 40,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "car",
    label: "Car Id",
    maxWidth: 100,
    minWidth: 40,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 40,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "totalPrice",
    label: "Total Price",
    minWidth: 80,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Order Status",
    minWidth: 40,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "deleteOrder",
    label: "Delete Order",
    minWidth: 40,
    maxWidth: 100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "deliveryDate",
    label: "Delivery Date",
    maxWidth: 100,
    minWidth: 40,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "transaction",
    label: "Txn Id",
    maxWidth: 100,
    minWidth: 40,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  userId: string;
  orderId: string;
  car: string;
  quantity: number;
  totalPrice: number;
  status: ReactNode;
  deliveryDate: string;
  transaction: string;
  deleteOrder: ReactNode;
}

function createData(
  userId: string,
  orderId: string,
  car: string,
  quantity: number,
  totalPrice: number,
  status: ReactNode,
  deleteOrder: ReactNode,
  deliveryDate: string,
  transaction: string
): Data {
  return {
    userId,
    orderId,
    car,
    quantity,
    totalPrice,
    status,
    deleteOrder,
    deliveryDate,
    transaction,
  };
}

const AllOrders = () => {
  const { data: orders, refetch } = useGetOrdersQuery([]);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  // function handle Status Change
  const handleStatusChange = async (data: {
    value: string;
    orderId: string;
  }) => {
    const res = await updateOrder({
      status: data.value,
      orderId: data.orderId,
    });
    if (res.data) {
      refetch();
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    console.log(orderId);
    const res = await deleteOrder(orderId);
    if (res?.data) {
      refetch();
    }
  };

  const rows =
    orders?.data &&
    orders?.data.map((item: any) => {
      return createData(
        item?.user,
        item?._id,
        item?.cars[0]?.car,
        item?.cars[0]?.quantity,
        item?.totalPrice,
        <select
          style={{
            width: "100px",
            backgroundColor: "white",
            color: "black",
          }}
          defaultValue={item?.status}
          onChange={(e) => {
            handleStatusChange({ value: e.target.value, orderId: item?._id });
          }}
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Shipped</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>,
        <Button
          sx={{ color: "black" }}
          onClick={() => handleDeleteOrder(item?._id)}
        >
          Delete Order
        </Button>,
        item?.deliveryDate,
        item?.transaction?.id
      );
    });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 526 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: "center",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ textAlign: "center" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows?.length : 10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default AllOrders;
