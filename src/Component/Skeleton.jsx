import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
  },
});

const Skeleton2 = ({ type, width, center }) => {
  // "h1", "h3", "body1", "caption"
  const variants = [type];
  function TypographyDemo(props) {
    const { loading = false } = props;

    return (
      <div>
        {variants.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? <Skeleton /> : ""}
          </Typography>
        ))}
      </div>
    );
  }

  TypographyDemo.propTypes = {
    loading: PropTypes.bool,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={8}>
        {center ? (
          <Grid item xs>
            <TypographyDemo />
          </Grid>
        ) : null}
        <Grid item xs>
          <TypographyDemo className="bg-[#ddd]" loading />
        </Grid>
        {width || center ? (
          <Grid item xs>
            <TypographyDemo />
          </Grid>
        ) : null}
      </Grid>
    </ThemeProvider>
  );
};

export default Skeleton2;
