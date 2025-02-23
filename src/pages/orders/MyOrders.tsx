import { useGetOrdersByUserIdQuery } from "../../redux/features/admin/orderManagement/orderManagementApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../redux/features/user/accountManagementApi";
import { useAppSelector } from "../../redux/hooks";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

interface Column {
  id:
    | "orderId"
    | "car"
    | "quantity"
    | "status"
    | "deliveryDate"
    | "totalPrice"
    | "transaction";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "orderId",
    label: "Order Id",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "car",
    label: "Car Id",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 60,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "totalPrice",
    label: "Total Price",
    minWidth: 80,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Order Status",
    minWidth: 80,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "deliveryDate",
    label: "Delivery Date",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "transaction",
    label: "Txn Id",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  orderId: string;
  car: string;
  quantity: number;
  totalPrice: number;
  status: string;
  deliveryDate: string;
  transaction: string;
}

function createData(
  orderId: string,
  car: string,
  quantity: number,
  totalPrice: number,
  status: string,
  deliveryDate: string,
  transaction: string
): Data {
  return {
    orderId,
    car,
    quantity,
    totalPrice,
    status,
    deliveryDate,
    transaction,
  };
}

const MyOrders = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const { data: orders } = useGetOrdersByUserIdQuery(user?.email);

  const rows =
    orders?.data &&
    orders?.data.map((item: any) => {
      return createData(
        item?._id,
        item?.cars[0]?.car,
        item?.cars[0]?.quantity,
        item?.totalPrice,
        item?.status,
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
                  style={{ minWidth: column.minWidth }}
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
                        <TableCell key={column.id} align={column.align}>
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

export default MyOrders;
