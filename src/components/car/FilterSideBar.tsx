import React, { useState } from "react";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FilterList } from "@mui/icons-material";

const SidebarExample = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newState: boolean) => () => {
    setOpen(newState);
  };

  return (
    <>
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
        onClick={toggleDrawer(true)}
      >
        <FilterList sx={{ fontSize: "30px" }} />
        Filter
      </Button>

      {/* Sidebar (Drawer) */}
    </>
  );
};

export default SidebarExample;
