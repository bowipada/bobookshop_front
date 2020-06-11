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
  Button,
  Select,
  MenuItem,
  Modal
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { fetchPublishers } from "../redux/actions/publisherAction";
import {
  fetchDiscounts,
  changePercentDiscount,
  addDiscount,
  cancelAddDiscount,
  cancelEditDiscount,
  createDiscount,
  updateDiscount,
  changePublisherDiscount,
  deleteDiscount,
  editingDiscount
} from "../redux/actions/discountAction";

const contianerStyle = { marginTop: "5px" };
const modalStyle = {
  padding: "20px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  background: "white",
  width: "300px",
  height: "100px",
  textAlign: "center",
  outline: "none",
  borderRadius: 5
};

class Discount extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.onAdd = this.onAdd.bind(this);
    this.onChangePercent = this.onChangePercent.bind(this);
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onChangePercent(event, index) {
    let discountPercent = event.target.value;
    if (event.target.value) {
      discountPercent = parseInt(discountPercent);
      if (isNaN(discountPercent)) {
        discountPercent = "";
      }
    }
    this.props.dispatch(changePercentDiscount({ index, discountPercent }));
  }

  onChangePublisher(event, index) {
    let publisherId = event.target.value;
    this.props.dispatch(changePublisherDiscount({ index, publisherId }));
  }

  onAdd() {
    if (this.props.discounts.length ===0 || this.props.discounts[0].discountPercent) {
      this.props.dispatch(addDiscount());
    }
  }

  onSubmitAdd() {
    let newItem = this.props.discounts[0];
    const item = this.props.discounts.slice(1).find(e => e.publisherId === newItem.publisherId);
    if (item) {
      this.setState({ showModal: true });
      this.onCancelAdd();
    } else {
      this.props.dispatch(createDiscount(newItem));
    }
  }

  onSubmitUpdate(index) {
    this.props.dispatch(updateDiscount(this.props.discounts[index], index));
  }

  onCancelAdd() {
    this.props.dispatch(cancelAddDiscount());
  }

  onCancelEdit(index) {
    this.props.dispatch(cancelEditDiscount(index));
  }

  onDelete(index) {
    this.props.dispatch(deleteDiscount(this.props.discounts[index], index));
  }

  onEditing(index) {
    this.props.dispatch(editingDiscount(index));
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  rowItem(row, index) {
    if (row.isAdd || row.isEdit) {
      const listPubs = this.props.publishers.map(e => {
        return <MenuItem value={e.id} key={e.id}>{e.publisherName}</MenuItem>
      });
      listPubs.splice(0, <MenuItem value="" key="0"></MenuItem>);
      let publisher;
      if (row.isAdd) {
        publisher = (<Select
          fullWidth={true}
          value={row.publisherId}
          onChange={(event) => this.onChangePublisher(event, index)}
        >{listPubs}
        </Select>)
      } else {
        publisher = row.publisher.publisherName;
      }
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell style={{ width: "150px" }}>
            {publisher}
          </TableCell>
          <TableCell><Input value={row.discountPercent}
            onChange={(event) => this.onChangePercent(event, index)}
          /></TableCell>
          <TableCell>
            <Button
              color="primary"
              disabled={!row.discountPercent || !row.publisherId}
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
          <TableCell>{row.publisher.publisherName}</TableCell>
          <TableCell align="right">{row.discountPercent}</TableCell>
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
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={1} bgcolor="secondary.dark">Discount</Box>
          <Container style={contianerStyle}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={this.onAdd} >Add
              </Button>
            </div>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell style={{ width: "150px" }}>Publisher</TableCell>
                  <TableCell style={{ width: "120px" }} align="right">Discount Percent</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.discounts.map((row, i) => {
                  return this.rowItem(row, i);
                })}
              </TableBody>
            </Table>
            <Modal
              open={this.state.showModal}
              onClose={this.handleCloseModal}
              aria-describedby="modal-description"
            >
              <div id="modal-description" style={modalStyle}>
                <p>This publisher has exist discount. </p>
                <Button variant="contained" onClick={this.handleCloseModal}>OK</Button>
              </div>
            </Modal>
          </Container>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(fetchPublishers("publisherName"));
    this.props.dispatch(fetchDiscounts());
  }
}

const mapStateToProps = state => {
  return {
    publishers: state.publishers.items,
    discounts: state.discounts.items
  };
};

export default connect(mapStateToProps)(Discount);
