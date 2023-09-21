// WifiList.js
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React from "react";

type WifiNetwork = {
  ssid: string;
  signalStrength: number;
  securityType: "Open" | "WEP" | "WPA" | "WPA2" | "WPA3";
};

async function fetchWifiNetworks(): Promise<WifiNetwork[]> {
  return [
    {
      ssid: "MyWiFiNetwork1",
      signalStrength: 80, // Signal strength in dBm or percentage
      securityType: "WPA2",
      // Other network information
    },
    {
      ssid: "MyWiFiNetwork2",
      signalStrength: 70,
      securityType: "Open",
      // Other network information
    },
    // More WiFi network objects...
  ];
}

function WifiList() {
  const [wifiNetworks, setWifiNetworks] = useState<WifiNetwork[] | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(
    null,
  );

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // Handle WiFi network selection
  const handleNetworkSelect = (network: WifiNetwork) => {
    setSelectedNetwork(network);
  };

  const [wifiPassword, setWifiPassword] = useState("");

  const handleSubmit = () => {
    console.log("Form submitted with data:", wifiPassword);
    // You can add your logic to submit the data or close the form, etc.
  };

  useEffect(() => {
    // Fetch WiFi networks
    fetchWifiNetworks().then(setWifiNetworks);
  }, []);

  return (
    <Box>
      {wifiNetworks === null ? (
        <Typography>Loading...</Typography>
      ) : (
        !selectedNetwork && (
          <>
            <Typography variant="h5">Available WiFi Networks</Typography>
            <List>
              {wifiNetworks.map((network) => (
                <ListItem key={network.ssid}>
                  <Button onClick={() => handleNetworkSelect(network)}>
                    {network.ssid}
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )
      )}
      {selectedNetwork && (
        <>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction={"column"}>
              <Typography variant="h5">Connect to:</Typography>
              <Typography variant="h6">{selectedNetwork.ssid}</Typography>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button variant="contained" type="submit">
                {" "}
                Connect{" "}
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Box>
  );
}

export default WifiList;
