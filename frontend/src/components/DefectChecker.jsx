import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import { styled } from "@mui/system";
import "./DefectChecker.css"; // Import the CSS file

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "1px dotted #d3d3d3",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)({
  padding: "16px 8px",
});

const Badge = styled("div")({
  backgroundColor: "#E0E0E0",
  color: "#3F51B5",
  padding: "4px 8px",
  borderRadius: "4px",
  display: "inline-block",
});

const DefectChecker = () => {
  const rows = [
    { type: "Delay in filing", description: "The petition was not filed within the stipulated time", document: "Main petition", status: "Marked as defect", version: "View v1", daysRemaining: "NA" },
    { type: "Incomplete documentation", description: "Missing supporting witness statements", document: "Affidavit", status: "Marked as defect", version: "View v1", daysRemaining: "NA" },
    { type: "Incorrect indexing", description: "Page numbers in the index do not match", document: "Main petition", status: "Marked as defect", version: "View v1", daysRemaining: "NA" },
    { type: "Incorrect court fees", description: "Court fee is not clearly mentioned in the receipt", document: "Main petition", status: "Marked as defect", version: "View v1", daysRemaining: "NA" },
  ];

  return (
    <Paper className="defectCheckerContainer">
      <div className="headerContainer">
        <Typography variant="h6">Defect checker</Typography>
        <Button variant="contained" className="addDefectButton">Add defect</Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <SearchIcon />
        <TextField placeholder="Search defects" variant="outlined" size="small" sx={{ flexGrow: 1 }} />
        <Select defaultValue="" size="small" displayEmpty sx={{ minWidth: 120 }}>
          <MenuItem value="">All documents</MenuItem>
        </Select>
        <Select defaultValue="" size="small" displayEmpty sx={{ minWidth: 120 }}>
          <MenuItem value="">All status</MenuItem>
        </Select>
        <Select defaultValue="" size="small" displayEmpty sx={{ minWidth: 120 }}>
          <MenuItem value="">All </MenuItem>
        </Select>

      </div>

      <div className="summaryContainer">
        <div className="summaryItem">Total: <strong>5</strong></div>
        <div className="summaryItem">Resolved: <strong>0</strong></div>
        <div className="summaryItem">Unresolved: <strong>5</strong></div>
        <div className="summaryItem">Notified: <strong>0</strong></div>
        <a href="#" className="exportReportLink">
          <DescriptionIcon fontSize="small" />
          Export report
        </a>
      </div>

      <Divider />

      <TableContainer>
        <Table aria-label="defect checker table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
              <StyledTableCell>Defect type</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Document</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Versioning</StyledTableCell>
              <StyledTableCell>Days remaining</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell><Checkbox /></StyledTableCell>
                <StyledTableCell>
                  <Typography fontWeight="bold">{row.type}</Typography>
                </StyledTableCell>
                <StyledTableCell>{row.description}</StyledTableCell>
                <StyledTableCell>{row.document}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>
                  <Typography color="primary" component="span" style={{ cursor: "pointer" }}>
                    {row.version}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Badge>{row.daysRemaining}</Badge>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DefectChecker;
