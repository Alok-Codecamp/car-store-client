import { useMyAccountQuery } from "../../redux/features/user/accountManagementApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TDecoded } from "../../types/userType";
import { Box } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const user = useAppSelector(selectCurrentUser) as TDecoded;
  const { data: userData } = useMyAccountQuery(user.email);
  const myData = userData?.data?.data;
  console.log(myData);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          boxShadow: "0px 0px 5px 1px lightgray",
          borderRadius: "10px",
          marginTop: "50px",
          width: "90%",
        }}
      >
        {/* welcome box  */}
        <Box
          sx={{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
            textAlign: "center",
          }}
        >
          <img
            style={{
              border: "2px solid gray",
              borderRadius: "50%",
              width: "150px",
            }}
            src="https://www.startech.com.bd/image/cache/catalog/laptop/smart/flairedge/flairedge-01-228x228.webp"
            alt="image"
          />
          <p style={{ lineHeight: "0px" }}>Hello,</p>
          <h3 style={{ lineHeight: "5px" }}>{myData?.name}</h3>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: "200px",
              backgroundColor: "whitesmoke",
              boxShadow: "0px 0px 5px 1px lightgray",
              borderRadius: "10px",
              textAlign: "center",
              margin: "40px",
              padding: "20px",
            }}
          >
            <Link to="edit-profile">
              <AccountCircle />
              <h4>Edit Profile</h4>
            </Link>
          </Box>
          <Box
            sx={{
              width: "200px",
              backgroundColor: "whitesmoke",
              boxShadow: "0px 0px 5px 1px lightgray",
              borderRadius: "10px",
              textAlign: "center",
              margin: "40px",
              padding: "20px",
            }}
          >
            <Link to="change-password">
              <LockRounded />
              <h4>Change Password</h4>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyAccount;
