import {
  Button,
  Container,
  Typography,
  makeStyles,
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },

  title: {
    marginBottom: 20,
  },
});

export default function Create() {
  const classes = useStyles();
  const [Title, setTitle] = useState("");
  const [Detail, setDetail] = useState("");
  const [Category, setCategory] = useState("");
  const [TitleError, setTitleError] = useState(false);
  const [DetailError, setDetailError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Title) {
      setTitleError(true);
    }

    if (!Detail) {
      setDetailError(true);
    }

    if (Detail && Title && Category) {
      axios
        .post("http://localhost:8000/notes", {
          title: Title,
          details: Detail,
          category: Category,
        })
        .then(() => history.push("/"));
    }
  };
  return (
    <Container maxWidth="md">
      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoCorrect="false" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={Title}
          className={classes.field}
          label="Note Title"
          fullWidth
          variant="outlined"
          color="secondary"
          required
          error={TitleError}
        />
        <TextField
          onChange={(e) => setDetail(e.target.value)}
          className={classes.field}
          label="Detail"
          fullWidth
          variant="outlined"
          color="secondary"
          multiline
          minRows="4"
          required
          error={DetailError}
        />

        <FormControl
          className={classes.field}
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormLabel>Note Category</FormLabel>
          <RadioGroup>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
