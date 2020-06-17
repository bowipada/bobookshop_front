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
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  editingCategory,
  addCategory,
  cancelAddCategory,
  cancelEditCategory,
  changeNameCategory
} from "../redux/actions/categoryAction";

const contianerStyle = { marginTop: "5px" };

class Category extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditing = this.onEditing.bind(this);
  }

  onChangeName(event, index) {
    const name = event.target.value;
    this.props.dispatch(changeNameCategory({index, name }));
  }

  onAdd() {
    if (this.props.categories.length === 0 || this.props.categories[0].categoryName) {
      this.props.dispatch(addCategory());
    }
  }

  onSubmitAdd() {
    this.props.dispatch(createCategory(this.props.categories[0]));
  }

  onSubmitUpdate(index) {
    this.props.dispatch(updateCategory(this.props.categories[index], index));
  }

  onCancelAdd() {
    this.props.dispatch(cancelAddCategory());
  }

  onCancelEdit(index) {
    this.props.dispatch(cancelEditCategory(index));
  }

  onDelete(index) { 
    this.props.dispatch(deleteCategory(this.props.categories[index], index));
  }

  onEditing(index) {
    this.props.dispatch(editingCategory(index));
  }

  rowItem(row, index) {
    if (row.isAdd || row.isEdit) {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell><Input value={row.CategoryName}
            onChange={(event) => this.onChangeName(event, index)} /></TableCell>
          <TableCell>
            <Button 
              disabled={!row.categoryName}
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
          <TableCell>{row.categoryName}</TableCell>
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
    const { categories } = this.props;
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={1} bgcolor="secondary.dark">Category</Box>
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
                  <TableCell>Category</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((item, i) => this.rowItem(item, i))}
              </TableBody>
            </Table>
          </Container>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.dispatch(fetchCategory());
  }
}

const mapStateToProps = state => {
  return { categories: state.categories.items };
};

export default connect(mapStateToProps)(Category);