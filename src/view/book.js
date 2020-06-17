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
  TextField,
  Button,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  Popover,
  Checkbox,
  ListItemText,
  TablePagination
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';

import { connect } from "react-redux";
import { fetchPublishers } from "../redux/actions/publisherAction";
import { fetchCategory } from "../redux/actions/categoryAction";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
  saveBookCategories
} from "../redux/actions/bookAction";

const contianerStyle = { marginTop: "5px" };
const detailStyle = { width: "300px" };
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      showDialog: false,
      isEdit: false,
      editIndex: -1,
      item: { categories: [] },
      anchorEl: null,
      anchorIndex: -1,
      keyword: "",
      rowsPerPage: 25,
      page: 0
    };
    this.onAdd = this.onAdd.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
  }


  render() {
    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({
        rowsPerPage: +event.target.value,
        page: 0
      });
    };

    const handleChangeCate = (event) => {
      const categories = event.target.value;
      this.setState({
        item: { ...this.state.item, categories }
      });
    };

    const selectedCate = (selectedIds) => {
      if (selectedIds.length > 0) {
        const arr = selectedIds.map(id => {
          const cate = this.props.categories.find(c => c.id === id);
          if (cate) {
            return cate.categoryName;
          }
        });
        return arr.join(", ");
      }
      return "";
    };

    const listPubs = this.props.publishers.map(e => {
      return <MenuItem value={e.id} key={e.id}>{e.publisherName}</MenuItem>
    });
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={1} bgcolor="secondary.dark">Book</Box>
          <Container style={contianerStyle}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={this.onAdd} >Add
              </Button>
            </div>
            <Box m={1} display="flex">
              <Box flexGrow={2}>
                <Input
                  value={this.state.keyword}
                  onChange={this.onKeywordChange}
                  fullWidth={true}
                  placeholder="Book name or Author"
                />
              </Box>
              <IconButton onClick={this.onSearch}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.books.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  .map((row, i) => {
                    return this.rowItem(row, i);
                  })}
              </TableBody>
            </Table>
            {this.props.books.length > 0 && <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={this.props.books.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
          </Container>
        </div>

        <Dialog open={this.state.showDialog}
          onClose={this.onCloseDialog}
          fullWidth={true}
          disableBackdropClick={true}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.isEdit ? 'Edit' : 'Add'} Book</DialogTitle>
          <DialogContent>
            <div>
              <TextField label="Name"
                fullWidth={true}
                value={this.state.item.bookName}
                onChange={(event) => this.onInputChange(event, 'bookName')} />
            </div>
            <div>
              <TextField label="Author"
                fullWidth={true}
                value={this.state.item.author}
                onChange={(event) => this.onInputChange(event, 'author')} />
            </div>
            <div>
              <TextField label="Price" style={{ width: "50%" }}
                fullWidth={true}
                value={this.state.item.price}
                onChange={(event) => this.onInputChange(event, 'price')} />

              <FormControl style={{ width: "40%", marginLeft: "10%" }}>
                <InputLabel id="plisher-label">Publisher</InputLabel>
                <Select
                  labelId="plisher-label"
                  value={this.state.item.publisherId}
                  onChange={(event) => this.onInputChange(event, 'publisherId')}
                >{listPubs}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField label="Detail"
                rows={4}
                multiline={true}
                fullWidth={true}
                value={this.state.item.detail}
                inputProps={{
                  maxLength: 1000,
                }}
                onChange={(event) => this.onInputChange(event, 'detail')} />
            </div>
            <div>
              <FormControl fullWidth={true}>
                <InputLabel id="mutiple-checkbox-label">Categories</InputLabel>
                <Select
                  labelId="mutiple-checkbox-label"
                  id="mutiple-checkbox"
                  multiple
                  value={this.state.item.categories}
                  onChange={handleChangeCate}
                  input={<Input />}
                  renderValue={(selected) => selectedCate(selected)}
                  MenuProps={MenuProps}
                >
                  {this.props.categories.map((cate) => (
                    <MenuItem key={cate.id} value={cate.id}>
                      <Checkbox color="primary" checked={this.state.item.categories.indexOf(cate.id) > -1} />
                      <ListItemText primary={cate.categoryName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseDialog}>
              Cancel
          </Button>
            <Button onClick={this.onSubmit} color="primary" disabled={this.state.item.bookName === ''}>
              Submit
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  rowItem(row, index) {
    const open = Boolean(this.state.anchorEl);
    index = (this.state.rowsPerPage * this.state.page) + index;
    const handleOpen = (event, index) => {
      this.setState({ anchorEl: event.currentTarget, anchorIndex: index });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null, anchorIndex: -1 });
    };

    return (
      <TableRow key={row.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.bookName}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.publisherId ? row.publisher.publisherName : ''}</TableCell>
        <TableCell align="right">{row.publisher && row.publisher.discount && row.publisher.discount.discountPercent ? row.publisher.discount.discountPercent + '%' : '-'}</TableCell>
        <TableCell>
          {row.bookCategories && row.bookCategories.map(e => e.categoryName).join(", ")}
        </TableCell>
        <TableCell>
          <IconButton aria-describedby={open ? 'detail-' + index : undefined} onClick={(event) => handleOpen(event, index)} >
            <InfoIcon />
          </IconButton>
          <Popover
            id={open ? 'detail-' + index : undefined}
            open={open && index === this.state.anchorIndex}
            anchorEl={this.state.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box p={1} style={detailStyle}>{row.detail}</Box>
          </Popover>
          <IconButton onClick={() => this.onEdit(row, index)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => this.onDelete(row, index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>);
  }

  onAdd() {
    this.setState({
      showDialog: true, item: {
        bookName: "",
        author: "",
        detail: "",
        price: "",
        publisherId: "",
        categories: []
      }
    });
  }

  onEdit(item, index) {
    let categories = item.bookCategories.map(e => e.categoryId);
    this.setState({
      item: { ...item, categories },
      editIndex: index,
      isEdit: true,
      showDialog: true
    });
  }

  onDelete(item, index) {
    this.props.dispatch(deleteBook(item, index));
  }

  onCloseDialog() {
    this.setState({ showDialog: false });
  }

  onInputChange(event, key) {
    const item = { ...this.state.item };
    const txt = event.target.value;
    item[key] = txt;
    this.setState({ item });
  }

  onSubmit() {
    if (this.state.isEdit) {
      this.props.dispatch(updateBook(this.state.item, this.state.editIndex)).then(() => {
        this.props.dispatch(saveBookCategories(this.state.item.categories, this.state.item.id));
        this.setState({ isEdit: false });
        this.onCloseDialog();
      });
    } else {
      this.props.dispatch(createBook(this.state.item)).then((res) => {
        if (res.id) {
          this.props.dispatch(saveBookCategories(this.state.item.categories, res.id));
        }
        this.onCloseDialog();
      });
    }
  }

  onSearch() {
    this.props.dispatch(fetchBooks(this.state.keyword))
  }

  onKeywordChange(event) {
    const keyword = event.target.value;
    this.setState({ keyword });
  }

  componentDidMount() {
    this.props.dispatch(fetchBooks());
    this.props.dispatch(fetchPublishers("publisherName"));
    this.props.dispatch(fetchCategory("categoryName"));
  }

}

const mapStateToProps = state => {
  return {
    publishers: state.publishers.items,
    books: state.books.items,
    categories: state.categories.items
  };
};

export default connect(mapStateToProps)(Book);