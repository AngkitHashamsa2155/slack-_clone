import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import penguine from "../static/images/avatar-1295398__340.png";
// import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as firebase from "../firebase";
import Menu from "./Menu";
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  square: {
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
}));
const Header = () => {
  const classes = useStyles();
  const [user] = useAuthState(firebase.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const auth = getAuth();
  console.log(firebase.auth);
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(profileImage);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        localStorage.clear();
        // console.log("sign up success");
        handleClose();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Container>
      {/* header left */}
      <HeaderLeft>
        <AccessTimeIcon />
      </HeaderLeft>
      {/* header search */}
      <HeaderSearch>
        <input placeholder="search user" type="text" />
        <span className="search_icon">
          <SearchIcon />
        </span>

        {/* header right */}
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
        <div style={{ cursor: "pointer" }} onClick={handleClick}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            {user?.photoURL && (
              <Avatar
                alt="Remy Sharp"
                src={user?.photoURL || penguine}
                variant="square"
                className={classes.square}
              />
            )}
          </StyledBadge>
        </div>

        <Menu anchorEl={anchorEl} handleClose={handleClose} logOut={logOut} />
      </HeaderRight>
    </Container>
  );
};

export default Header;

const Container = styled.nav`
  background-color: var(--Navbar-color);
  color: white;
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.625rem 0.5rem;
`;
const HeaderLeft = styled.div`
  flex: 0.2;
  display: flex;
  align-items: center;
  margin-right: 20px;
  /* border: 1px solid white; */

  > .MuiSvgIcon-root {
    margin-left: auto;
    /* margin-right: 2rem; */
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;
const HeaderSearch = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: #5d3d5e;

  color: gray;
  flex: 0.5;
  width: 90%;
  position: relative;
  border: 1px gray solid;
  cursor: pointer;
  input {
    background-color: transparent;
    outline: none;
    width: 100%;
    border: none;
    color: white;
    padding: 0.5rem 0.5rem;

    ::placeholder {
      color: white;
    }
  }
  .search_icon {
    margin-left: auto;
    margin-right: 6px;
    position: absolute;
    right: 3px;
    top: 3px;
    > .MuiSvgIcon-root {
      color: white;
    }
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0.3;
  gap: 0.5rem;
  > .MuiSvgIcon-root {
    margin-left: auto;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  height: 1rem;
  :hover {
    opacity: 0.8;
  }
`;
