import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress, Backdrop, Modal, Fade } from "@mui/material";
import Card from "./Card";

export default function Search() {
  const [isLoading, setLoading] = useState(true); // Loading API State
  const [idCity, setIdCity] = useState(null); // Store ID City
  const [cities, setCities] = useState([]); // Store Cities List
  const [open, setOpen] = useState(false); // Modal State

  const handleOpen = (selected) => setOpen(true); // Open Modal
  const handleClose = () => setOpen(false); // Close Modal

  useEffect(() => {
    axios
      .get("https://api.myquran.com/v1/sholat/kota/semua")
      .then((result) => {
        setCities(result.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  const CustomTextField = withStyles({
    root: {
      "& input": {
        color: "white",
      },
      "& label": {
        color: "white",
      },
      "& label.Mui-focused": {
        color: "#f9bc60",
      },
      "& :hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f9bc60 !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "3px !important",
        borderColor: "white !important",
      },
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f9bc60 !important",
      },
    },
  })(TextField);

  return (
    <>
      {idCity ? (
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <div>
              <Card id={idCity.id} />
            </div>
          </Fade>
        </Modal>
      ) : (
        ""
      )}
      <Autocomplete
        freeSolo
        id="search-city"
        disableClearable
        sx={{ width: "50%", minWidth: "300px" }}
        value={idCity}
        onChange={(event, newIdCity) => {
          setIdCity(newIdCity);
          setOpen(true);
        }}
        getOptionLabel={(option) => option.lokasi}
        options={cities}
        renderOption={(cities, option) => {
          return (
            <li {...cities} key={option.id}>
              {option.lokasi}
            </li>
          );
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Search City"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </>
  );
}
