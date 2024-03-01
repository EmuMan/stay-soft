import { Typography } from "@mui/material";

let MuiTypography = () => {
  return (
    <div>
      <Typography variant="h1">h1 Heading</Typography>
      <Typography variant="h2">h2 Heading</Typography>
      <Typography variant="h3">h3 Heading</Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        h4 Heading
      </Typography>
      <Typography variant="h5">h5 Heading</Typography>
      <Typography variant="h6">h6 Heading</Typography>

      <Typography variant="subtitle1">Sub title 1</Typography>
      <Typography variant="subtitle2">Sub title 2</Typography>

      <Typography>
        The unanimous Declaration of the thirteen united States of America, When
        in the Course of human events, it becomes necessary for one people to
        dissolve the political bands which have connected them with another, and
        to assume among the powers of the earth, the separate and equal station
        to which the Laws of Nature and of Nature's God entitle them, a decent
        respect to the opinions of mankind requires that they should declare the
        causes which impel them to the separation.
      </Typography>
      <Typography variant="body2">
        hich have connected them with another, and to assume among the powers of
        the earth, the separate and equal station to which the Laws of Nature
        and of Nature's God entitle them, a decent respect to the opinions of
        mankind requires that they should declare the causes which impel them to
        the separation
      </Typography>
    </div>
  );
};

export { MuiTypography };
