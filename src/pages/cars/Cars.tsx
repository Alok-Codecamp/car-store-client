import NavBar from "../../components/navBar/NavBar";
import { useGetCarsQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { Box, Breadcrumbs, Button, Divider, Grid2 } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  BrandingWatermark,
  Category,
  FilterList,
  Home,
} from "@mui/icons-material";
import "./Cars.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useMemo, useState } from "react";
import {
  FilterItems,
  FilterListItem,
  FilterPriceRange,
  SearchBox,
  SelectLimit,
} from "./FilterItems";
import FeaturedSkelton from "../../components/layout/Skelton";
import { ICars } from "../../types/carInterface";
import ImgMediaCard from "../../components/layout/Card";

type Anchor = "right";

const Cars = () => {
  const [open, setOpen] = useState([true, true, true]);
  const [state, setState] = useState({ right: false });
  const [priceRange, setPriceRange] = useState({
    minPrice: 10000,
    maxPrice: 99000,
  });
  const [limit, setLimit] = useState("10");
  const [sortBy, setSortBy] = useState("Default");
  const [sort, setSort] = useState("-price");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);

  // set sort value based on selected sort
  useEffect(() => {
    setSort(sortBy === "Price(Low>High)" ? "price" : "-price");
  }, [sortBy]);
  const queryArray = useMemo(() => {
    return [
      { name: "limit", value: limit },
      { name: "sort", value: sort },
      {
        name: "price",
        value: { min: priceRange.minPrice, max: priceRange.maxPrice },
      },
      { name: "search", value: search },
      ...category.map((item) => ({ name: "category", value: item })),
      ...brand.map((item) => ({ name: "brand", value: item })),
    ];
  }, [sort, priceRange, search, category, limit, brand]);

  // Get car query
  const { data: cars, isLoading } = useGetCarsQuery(queryArray);
  // get location for breadCrumbs
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const usableLocation = splitLocation.slice(1, splitLocation.length);

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

  // handle search box
  const handleSearch = () => {
    console.log(search);
    setSearch(search);
  };

  // handle Category Change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCategory((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // handle Brande change

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setBrand((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  // handle model change
  // const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   setModel((prev) =>
  //     checked ? [...prev, value] : prev.filter((item) => item !== value)
  //   );
  // };

  const handleFilterDropDwon = (index: number) => {
    setOpen((prev) => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  console.log(category);

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <FilterPriceRange setPriceRange={setPriceRange} priceRange={priceRange} />
      {/* filter category  */}
      <Divider />
      <FilterItems
        dropDownName="Category"
        drowDownIcon={<Category />}
        handleDropDown={handleFilterDropDwon}
        index={0}
        open={open[0]}
      >
        <FilterListItem
          handleChange={handleCategoryChange}
          value="SUV"
          filterName={category}
        />
        <FilterListItem
          handleChange={handleCategoryChange}
          value="Sedan"
          filterName={category}
        />
        <FilterListItem
          handleChange={handleCategoryChange}
          value="Coupe"
          filterName={category}
        />
      </FilterItems>
      <Divider />

      {/* Filter Brand  */}
      <FilterItems
        dropDownName="Brand"
        drowDownIcon={<BrandingWatermark />}
        handleDropDown={handleFilterDropDwon}
        open={open[1]}
        index={1}
      >
        <FilterListItem
          handleChange={handleBrandChange}
          value="BMW"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Audi"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Lexus"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Mercedes"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Honda"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Nissan"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Ford"
          filterName={brand}
        />
        <FilterListItem
          handleChange={handleBrandChange}
          value="Hyundai"
          filterName={brand}
        />
      </FilterItems>
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
            {/* filter category  */}
            <FilterItems
              dropDownName="Category"
              drowDownIcon={<Category />}
              handleDropDown={handleFilterDropDwon}
              index={0}
              open={open[0]}
            >
              <FilterListItem
                handleChange={handleCategoryChange}
                value="SUV"
                filterName={category}
              />
              <FilterListItem
                handleChange={handleCategoryChange}
                value="Sedan"
                filterName={category}
              />
              <FilterListItem
                handleChange={handleCategoryChange}
                value="Coupe"
                filterName={category}
              />
            </FilterItems>
            <Divider />

            {/* Filter Brand  */}
            <FilterItems
              dropDownName="Brand"
              drowDownIcon={<BrandingWatermark />}
              handleDropDown={handleFilterDropDwon}
              open={open[1]}
              index={1}
            >
              <FilterListItem
                handleChange={handleBrandChange}
                value="BMW"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Audi"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Lexus"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Mercedes"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Honda"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Nissan"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Ford"
                filterName={brand}
              />
              <FilterListItem
                handleChange={handleBrandChange}
                value="Hyundai"
                filterName={brand}
              />
            </FilterItems>

            {/* filter model */}
            {/* <FilterItems
              dropDownName="Model"
              drowDownIcon={<DirectionsCar/>}
              handleDropDown={handleFilterDropDwon}
              open={open[2]}
              index={2}
            >
              <FilterListItem
                handleChange={handleModelChange}
                value="Q7"
                filterName={brand}
              />
              
            </FilterItems> */}
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
                {list()}
              </SwipeableDrawer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                {/* Search item box */}
                <Box
                  sx={{
                    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <SearchBox
                    searchBoxStyle="search-box-lg"
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                  />
                </Box>

                {/* Select item limit  */}
                <SelectLimit
                  name="Show"
                  defaultValue="20"
                  setSelect={setLimit}
                  optionValue={["10", "14", "18", "24"]}
                />

                {/* sort item by price  */}
                <SelectLimit
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
                    Array.isArray(cars.data) &&
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
