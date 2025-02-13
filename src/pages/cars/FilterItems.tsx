import { Box } from "@mui/material";
import React from "react";

export type TRange = {
  minPrice: string;
  maxPrice: string;
};

interface FilterItemsProps {
  setPriceRange: (value: (prev: TRange) => TRange) => void;

  priceRange: TRange;
}

export const FilterPriceRange: React.FC<FilterItemsProps> = ({
  setPriceRange,
  priceRange,
}) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as keyof TRange;
    setPriceRange((prev: TRange) => ({ ...prev, [name]: value }));
  };
  console.log(priceRange);
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
        defaultValue={10000}
        type="range"
        min={10000}
        max={40000}
        name="minPrice"
        onChange={handleRangeChange}
        style={{
          width: "100px",
          height: "40px",
          marginRight: "1px",
        }}
      />
      <input
        defaultValue={10000}
        type="range"
        min={50000}
        max={100000}
        name="maxPrice"
        onChange={handleRangeChange}
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
          ${priceRange.minPrice}
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
          ${priceRange.maxPrice}
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
export const SelectItem = ({
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
