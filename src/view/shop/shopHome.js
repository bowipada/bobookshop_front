import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { fetchPublishers } from "../../redux/actions/publisherAction";
import { fetchTagsBooks } from "../../redux/actions/bookAction";
import { fetchDiscounts } from "../../redux/actions/discountAction";
import { withRouter } from "react-router-dom";
import { fetchCategory } from "../../redux/actions/categoryAction";
import BookGroup from "./bookGroup";
import { Box } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const GroupName = styled.div`
color: #009688;
font-size: 20px;
line-height: 20px;
font-weight: bold;
border-bottom: solid 2px #009688;
margin-bottom: 10px;
`

const LinkViewAll = styled.div`
  float: right;
  cursor: pointer;
  text-decoration: underline;
  color: #009688;
  font-size: 16px;
  font-weight: normal;
`


const Menu = styled.ul`
  margin: 0;
`
const MenuItem = styled.li`
  z-index: 1;
  list-style: none;
  color: #009688;
  font-weight: bold;
  display: inline-flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  &:hover>ul, & ul:hover {
    opacity: 1;
    visibility: visible;
  }
`

const SubMenu = styled.ul`
  visibility: hidden;
  opacity: 0;
  padding: 10px 0 0 0;
  flex-direction: column;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 2;
  transition: opacity 0.3s ease;
`

const SubMenuItem = styled.li`
  list-style: none;
  font-weight: normal;
  color: #3f3f3f;
  line-height: 40px;
  width: 150px;
  background: #fff;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    color: #009688;
    font-weight: bold;
  }
`

const groupWrap = {
  padding: "10px"
};

class ShopHome extends React.Component {
  constructor() {
    super();
    this.discounts = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchDiscounts()).then(() => {
      this.props.discounts.forEach(item => {
        this.discounts["pub-" + item.publisherId] = item.discountPercent;
      });
    });
    this.props.dispatch(fetchPublishers("publisherName"));
    this.props.dispatch(fetchTagsBooks({ limit: 8 }));
    this.props.dispatch(fetchCategory("categoryName"));
  }

  viewAll(id) {
    this.props.history.push('/shop/books?tag=' + id);
  }

  viewCategory(id) {
    this.props.history.push('/shop/books?cate=' + id);
  }

  render() {
    return (
      <div className="content">
        <Box p={1} m={1} bgcolor="secondary.dark">
          <Menu>
            <MenuItem>Categries <ArrowDropDownIcon />
              {this.props.categories.length > 0 && <SubMenu>
                {
                  this.props.categories.map(cate => {
                    return (
                      <SubMenuItem key={cate.id}
                        onClick={() => this.viewCategory(cate.id)}>{cate.categoryName}</SubMenuItem>
                    )
                  })
                }
              </SubMenu>
              }
            </MenuItem>
            <MenuItem>Publishers <ArrowDropDownIcon /></MenuItem>
          </Menu>
        </Box>
        {
          this.props.groups.map(group => {
            return (
              <div key={group.id} style={groupWrap}>
                <GroupName>{group.tagName}
                  <LinkViewAll onClick={() => this.viewAll(group.id)}>View all</LinkViewAll>
                </GroupName>
                <BookGroup books={group.book_tags} discounts={this.discounts}></BookGroup>
              </div>
            )
          })
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    publishers: state.publishers.items,
    books: state.books.items,
    groups: state.books.groups,
    discounts: state.discounts.items,
    categories: state.categories.items
  };
};

export default connect(mapStateToProps)(withRouter(ShopHome));