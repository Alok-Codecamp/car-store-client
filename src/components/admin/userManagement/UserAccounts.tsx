import {
  useChangeStatusMutation,
  useGetAllUserQuery,
} from "../../../redux/features/admin/userManagement/userManagementApi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ReactNode, useState } from "react";
import { Button } from "@mui/material";
interface Column {
  id: "name" | "role" | "status" | "changeStatus";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "changeStatus",
    label: "Change Status",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  name: string;
  role: string;
  status: string;
  changeStatus: ReactNode;
}

function createData(
  name: string,
  role: string,
  status: string,
  changeStatus: ReactNode
): Data {
  return {
    name,
    role,
    status,
    changeStatus,
  };
}

const UserAccounts = () => {
  const { data: users, refetch } = useGetAllUserQuery({});
  const [changeStatus] = useChangeStatusMutation();

  const handleStatusChange = async (data: {
    status: string;
    email: string;
  }) => {
    console.log(data);
    const res = await changeStatus({ status: data.status, email: data.email });
    refetch();
  };
  const rows =
    users?.data &&
    users?.data?.map((item: any) => {
      return createData(
        item.name,
        item.role,
        item.status,
        item.status === "Active" ? (
          <Button
            onClick={() =>
              handleStatusChange({ status: "Blocked", email: item.email })
            }
          >
            Blocked
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleStatusChange({ status: "Active", email: item.email })
            }
          >
            Active
          </Button>
        )
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

export default UserAccounts;
