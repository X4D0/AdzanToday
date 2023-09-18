import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import Search from "./Components/Search";

export default function App() {
  return (
    <Container sx={{ p: 20 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 200,
            fontWeight: "bold",
            color: "#fffffe",
            fontFamily: "DS Arabic",
          }}
        >
          Adzan
        </Typography>
        <Search />
      </Stack>
    </Container>
  );
}
