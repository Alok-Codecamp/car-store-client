import { ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import "./Cars.css";

interface FilterItemsProps {
  setMinPrice: (value: number) => void;
  minPrice: number;
  setMaxPrice: (value: number) => void;
  maxprice: number;
}

export const FilterPriceRange: React.FC<FilterItemsProps> = ({
  setMinPrice,
  minPrice,
  setMaxPrice,
  maxprice,
}) => {
  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
  };

  return (
    <Box
      sx={{
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",

      }}
    >
      <h4 style={{ lineHeight: "0px" }}>Price Range</h4>
      <input
        defaultValue={minPrice}
        type="range"
        min={"0"}
        max={"40000"}
        name="minPrice"
        onChange={handleMinPrice}
        style={{
          width: "100px",
          height: "40px",
          marginRight: "1px",
        }}
      />
      <input
        defaultValue={maxprice}
        type="range"
        min={"50000"}
        max={"99000"}
        name="maxPrice"
        onChange={handleMaxPrice}
        style={{
          width: "100px",
          height: "40px",
          marginLeft: "-1px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            backgroundColor: "whiteSmoke",
            padding: "2px 4px",
            border: "1px solid gray",
            boxShadow: "0px 1px 0px 0px gray",
            borderRadius: "2px",
          }}
        >
          ${minPrice}
        </span>
        <span
          style={{
            backgroundColor: "whiteSmoke",
            padding: "2px 4px",
            border: "1px solid gray",
            boxShadow: "0px 1px 0px 0px gray",
            borderRadius: "2px",
          }}
        >
          ${maxprice}
        </span>
      </Box>
    </Box>
  );
};

type TSelectItemProps = {
  setSelect: (value: string) => void;
  optionValue: string[];
  name: string;
  defaultValue: string;
};
export const SelectLimit = ({
  setSelect,
  optionValue,
  name,
  defaultValue,
}: TSelectItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",

      }}
    >
      <h5>{name}</h5>
      <select
        onChange={(e) => setSelect(e.target.value)}
        defaultValue={defaultValue}
        style={{
          border: "1px solid gray",
          width: "80px",
          borderRadius: "0px",
        }}
      >
        {optionValue.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Box>
  );
};

type TSearchProps = {
  setSearch: (value: string) => void;
  searchBoxStyle: string;
  handleSearch: () => void;
};
export const SearchBox = ({
  setSearch,
  searchBoxStyle,
  handleSearch,
}: TSearchProps) => {
  return (
    <Box>
      <span>Search</span>
      <input
        className={searchBoxStyle}
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        style={{
          position: "absolute",
          border: "none",
          backgroundColor: "white",
          marginLeft: "-40px",
          boxShadow: "none",
          marginTop: "4px",
        }}
        onClick={handleSearch}
      >
        <Search />
      </button>
    </Box>
  );
};

// filter llist item
type TFilterListItemProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  filterName: string[];
};
export const FilterListItem = ({
  filterName,
  value,
  handleChange,
}: TFilterListItemProps) => {
  return (
    <ListItemButton
      sx={{ pl: 8 }}
      onClick={() =>
        handleChange({
          target: {
            value: value,
            checked: !filterName.includes(value),
          },
        } as React.ChangeEvent<HTMLInputElement>)
      }
    >
      <input
        style={{
          width: "20px",
        }}
        type="checkbox"
        checked={filterName.includes(value)}
        readOnly
        value="Sport"
      />
      <Typography fontSize={12}>{value}</Typography>
    </ListItemButton>
  );
};

// filter item

type TFilterItemProps = {
  handleDropDown: (index: number) => void;
  open: boolean;
  children: ReactNode;
  index: number;

  dropDownName: string;
  drowDownIcon: ReactNode;
};
export const FilterItems = ({
  handleDropDown,
  open,
  children,
  index,
  dropDownName,
  drowDownIcon,
}: TFilterItemProps) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => handleDropDown(index)}>
        <ListItemIcon>{drowDownIcon}</ListItemIcon>
        <ListItemText primary={dropDownName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  );
};
