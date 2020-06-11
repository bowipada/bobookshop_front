import React from "react";
import Header from "./header";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Input,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import {
  fetchPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
  editingPublisher,
  addPublisher,
  cancelAddPublisher,
  cancelEditPublisher,
  changeNamePublisher
} from "../redux/actions/publisherAction";

const contianerStyle = { marginTop: "5px" };

class Publisher extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditing = this.onEditing.bind(this);
  }

  onChangeName(event, index) {
    const name = event.target.value;
    this.props.dispatch(changeNamePublisher({index, name }));
  }

  onAdd() {
    if (this.props.publishers.length === 0 || this.props.publishers[0].publisherName) {
      this.props.dispatch(addPublisher());
    }
  }

  onSubmitAdd() {
    this.props.dispatch(createPublisher(this.props.publishers[0]));
  }

  onSubmitUpdate(index) {
    this.props.dispatch(updatePublisher(this.props.publishers[index], index));
  }

  onCancelAdd() {
    this.props.dispatch(cancelAddPublisher());
  }

  onCancelEdit(index) {
    this.props.dispatch(cancelEditPublisher(index));
  }

  onDelete(index) { 
    this.props.dispatch(deletePublisher(this.props.publishers[index], index));
  }

  onEditing(index) {
    this.props.dispatch(editingPublisher(index));
  }

  rowItem(row, index) {
    if (row.isAdd || row.isEdit) {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell><Input value={row.publisherName}
            onChange={(event) => this.onChangeName(event, index)} /></TableCell>
          <TableCell>
            <Button 
              disabled={!row.publisherName}
              color="primary"
              onClick={() => {
              if (row.isAdd) {
                this.onSubmitAdd();
              } else {
                this.onSubmitUpdate(index);
              }
            }}>Save</Button>&nbsp;
            <Button onClick={() => {
              if (row.isAdd) {
                this.onCancelAdd();
              } else {
                this.onCancelEdit(index);
              }
            }}>Cancel</Button>
          </TableCell>
        </TableRow>);
    }
    else {
      return (
        <TableRow key={row.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{row.publisherName}</TableCell>
          <TableCell>
            <IconButton onClick={() => this.onEditing(index)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.onDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>);
    }
  }
  render() {
    const { publishers } = this.props;
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={1} bgcolor="secondary.dark">Publisher</Box>
          <Container style={contianerStyle}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={this.onAdd}>Add
              </Button>
            </div>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publishers.map((item, i) => this.rowItem(item, i))}
              </TableBody>
            </Table>
          </Container>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.dispatch(fetchPublishers());
  }
}

const mapStateToProps = state => {
  return { publishers: state.publishers.items };
};

export default connect(mapStateToProps)(Publisher);