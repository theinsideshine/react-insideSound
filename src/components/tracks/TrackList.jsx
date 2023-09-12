import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useTracks } from "../../hooks/useTracks";
import { TrackRow } from "./TrackRow";

export const TrackList = () => {
    const { tracks } = useTracks();   

    return (
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cancion</TableCell>                  
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map(({ id, title }) => (
                  <TrackRow
                  key={id}
                  id={id}
                  title={title}                  
              />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    );
};
