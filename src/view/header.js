import React from "react";
import {
  Toolbar, Typography, IconButton, AppBar, Drawer, List,
  ListItem, ListItemIcon, Box, Avatar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { getAvatar, getUser } from "../redux/selectors";
import { refreshToken } from "../redux/actions/userActions";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false
    }
    this.isLogin = localStorage.getItem("token") != null;
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.isLogin) {
      this.props.dispatch(refreshToken()).then(() => {
        if (localStorage.getItem("token")) {
          if (this.props.history.location.pathname === "/login" ||
            this.props.history.location.pathname === "/") {
            this.props.history.push('/book');
          }
        }
      });
      this.tRefreshToken = setInterval(() => {
        this.props.dispatch(refreshToken());
      }, 300000);
    } else {
      if (this.props.history.location.pathname !== "/login") {
        this.props.history.push('/login');
      }
    }
  }

  componentWillUnmount() {
    if (this.tRefreshToken) {
      clearInterval(this.tRefreshToken);
    }
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.props.history.push('/');
  }

  toggleDrawer(isOpen) {
    if (isOpen !== this.state.isOpen) {
      this.setState({ isOpen: isOpen });
    }
  }

  openDrawer() {
    this.toggleDrawer(true);
  }

  closeDrawer() {
    this.toggleDrawer(false);
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" bgcolor="primary.dark">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              className={this.isLogin ? '' : 'hidden'}
              onClick={this.openDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Bo's Bookshop Admin</Typography>
            <div className="grow"></div>
            {this.isLogin ? <Avatar color="secondary.main">{this.props.avatar}</Avatar> : ''}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.isOpen}
          onClose={this.closeDrawer}>
          <List>
            <ListItem className="nav-item">
              <LinkItem to="/book" label="Book" />
            </ListItem>
            <ListItem className="nav-item">
              <LinkItem to="/publisher" label="Publisher" />
            </ListItem>
            <ListItem className="nav-item">
              <LinkItem to="/discount" label="Discount" />
            </ListItem>
            <ListItem className="nav-item">
              <LinkItem to="/category" label="Category" />
            </ListItem>
            <ListItem className="nav-item">
              <LinkItem to="/tag" label="Tag" />
            </ListItem>
            <ListItem className="nav-item">
              <LinkItem to="/shop" label="Shop" />
            </ListItem>
            <ListItem className="nav-item" onClick={this.logout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>Logout
              </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

function LinkItem({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  if (match) {
    return <Box color="primary.main">{label}</Box>
  }
  return <Link to={to}>{label}</Link>
}

const mapStateToProps = state => {
  const { user } = state;
  const username = getUser(state, user);
  const avatar = getAvatar(state)
  return { username, avatar };
};

export default connect(mapStateToProps)(Header);
// export default Header;