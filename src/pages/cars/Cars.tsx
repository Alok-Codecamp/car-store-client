import NavBar from "../../components/navBar/NavBar";
import { useGetCarsQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { Box, Breadcrumbs, Button, Divider, Grid2 } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { FilterList, Home } from "@mui/icons-material";
import "./Cars.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { FilterPriceRange, SelectItem } from "./FilterItems";
import FeaturedSkelton from "../../components/layout/Skelton";
import { ICars } from "../../types/carInterface";
import ImgMediaCard from "../../components/layout/Card";

type Anchor = "right";
const Cars = () => {
  const [state, setState] = useState({ right: false });
  const [priceRange, setPriceRange] = useState({
    minPrice: "10000",
    maxPrice: "100000",
  });
  const [limit, setLimit] = useState("10");
  const [sortBy, setSortBy] = useState("Default");
  const [sort, setSort] = useState("-price");
  const { data: cars, isLoading } = useGetCarsQuery([
    { name: "limit", value: limit },
    { name: "sort", value: sort },
    {
      name: "price",
      value: { $gte: priceRange.minPrice, $lte: priceRange.maxPrice },
    },
    { name: "category", value: "SUV" },
  ]);
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const usableLocation = splitLocation.slice(1, splitLocation.length);
  console.log(priceRange);
  // set sort value based on selected sort
  useEffect(() => {
    if (sortBy === "Price(Low>High)") {
      setSort("price");
    } else {
      setSort("-price");
    }
  }, [sortBy]);

  // drawer toggler
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  console.log(limit, sortBy);
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <FilterPriceRange setPriceRange={setPriceRange} priceRange={priceRange} />
      <Divider />
    </Box>
  );

  return (
    <>
      <NavBar />
      <div className="car-container ">
        <div className="breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link style={{ textAlign: "center" }} to="/home" color="inherit">
              <Home
                style={{
                  fontSize: "16px",
                  marginRight: "10px",
                  marginTop: "4px",
                }}
              />
              <span style={{ color: "gray" }}>/</span> home
            </Link>

            {usableLocation.map((item, index) => (
              <Link key={index} to="/" color="inherit">
                {item}
              </Link>
            ))}
          </Breadcrumbs>
        </div>
        <Divider />

        <Box
          sx={{
            display: { lg: "grid", md: "grid" },
            gridTemplateColumns: "25% 75%",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "block", lg: "block" },
              border: "1px solid gray",
              paddingTop: "20px",
            }}
          >
            <FilterPriceRange
              setPriceRange={setPriceRange}
              priceRange={priceRange}
            />
            <Divider />
          </Box>
          <Box>
            <div className="filter-pagination-search-container">
              <Button
                sx={{
                  background: "none",
                  border: "none",
                  color: "black",
                  display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
                onClick={toggleDrawer("right", true)}
              >
                <FilterList
                  sx={{
                    fontSize: "30px",
                    marginRight: "0px",
                    marginTop: "  5px",
                  }}
                />
                Filter
              </Button>
              <SwipeableDrawer
                anchor="right"
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
              >
                {list("right")}
              </SwipeableDrawer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <SelectItem
                  name="Show"
                  defaultValue="20"
                  setSelect={setLimit}
                  optionValue={["10", "14", "18", "24"]}
                />
                <SelectItem
                  name="Sort By"
                  defaultValue="Default"
                  setSelect={setSortBy}
                  optionValue={[
                    "Price(Low>High)",
                    "Price(High>Low)",
                    "Default",
                  ]}
                />
              </Box>
            </div>
            <Box
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
                textAlign: "center",
              }}
            >
              <h2>Your perfect ride is just a click away!</h2>
              {isLoading ? (
                <FeaturedSkelton />
              ) : (
                <Grid2 container spacing={2}>
                  {cars &&
                    cars?.data.map((car: ICars, index: number) => (
                      <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <ImgMediaCard data={car} />
                      </Grid2>
                    ))}
                </Grid2>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Cars;
