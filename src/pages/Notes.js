import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [Notes, setNotes] = useState([]);

  const deleteNotes = async (id) => {
    await axios.delete("http://localhost:8000/notes/" + id).then(() => {
      const newNotes = Notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const breakpointCol = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpointCol}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {Notes.map((note) => {
          return (
            <div key={note.id}>
              <NoteCard note={note} deleteNotes={deleteNotes} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}
