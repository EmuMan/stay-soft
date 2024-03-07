import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

const MyBetsAndPrompts = (props) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="My bets and prompts tabs"
            onChange={handleChange}
            centered
          >
            <Tab label="Bets" value="1" />
            <Tab label="Prompts" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{props.prompts}</TabPanel>
        <TabPanel value="2">{props.bets}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default MyBetsAndPrompts;