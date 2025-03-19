import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const Skeleton2 = ({ type }) => {
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
    <Grid container spacing={8}>
      <Grid item xs>
        <TypographyDemo className="bg-[#ddd]" loading />
      </Grid>
    </Grid>
  );
};

export default Skeleton2;
