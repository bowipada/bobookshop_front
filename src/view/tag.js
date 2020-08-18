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
  fetchTags,
  createTag,
  updateTag,
  deleteTag,
  editingTag,
  addTag,
  cancelAddTag,
  cancelEditTag,
  changeTagName
} from "../redux/actions/tagAction";

const contianerStyle = { marginTop: "5px" };

class Tag extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditing = this.onEditing.bind(this);
  }

  onChangeName(event, index) {
    const tagName = event.target.value;
    this.props.dispatch(changeTagName({index, tagName }));
  }

  onAdd() {
    if (this.props.tags.length === 0 || this.props.tags[0].tagName) {
      this.props.dispatch(addTag());
    }
  }

  onSubmitAdd() {
    this.props.dispatch(createTag(this.props.tags[0]));
  }

  onSubmitUpdate(index) {
    this.props.dispatch(updateTag(this.props.tags[index], index));
  }

  onCancelAdd() {
    this.props.dispatch(cancelAddTag());
  }

  onCancelEdit(index) {
    this.props.dispatch(cancelEditTag(index));
  }

  onDelete(index) { 
    this.props.dispatch(deleteTag(this.props.tags[index], index));
  }

  onEditing(index) {
    this.props.dispatch(editingTag(index));
  }

  rowItem(row, index) {
    if (row.isAdd || row.isEdit) {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell><Input value={row.tagName}
            onChange={(event) => this.onChangeName(event, index)} /></TableCell>
          <TableCell>
            <Button 
              disabled={!row.tagName}
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
          <TableCell>{row.tagName}</TableCell>
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
    const { tags } = this.props;
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={1} bgcolor="secondary.dark">Tag</Box>
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
                  <TableCell>Tag</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((item, i) => this.rowItem(item, i))}
              </TableBody>
            </Table>
          </Container>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.dispatch(fetchTags());
  }
}

const mapStateToProps = state => {
  return { tags: state.tags.items };
};

export default connect(mapStateToProps)(Tag);