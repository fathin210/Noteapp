import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { blue, orange, red, yellow } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return yellow[700];
      }
      if (note.category == "reminders") {
        return blue[700];
      }
      if (note.category == "todos") {
        return orange[700];
      } else {
        return red[700];
      }
    },
  },
});

function NoteCard({ note, deleteNotes }) {
  const classes = useStyles(note);
  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          title={note.title}
          subheader={note.category}
          action={
            <IconButton onClick={() => deleteNotes(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
