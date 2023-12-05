import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import checkAuth from "../utils/checkAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/auth/authSlice";
import "./Navbar.css";

Navbar.proptypes = {
  mode: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};

export default function Navbar({ mode, onSwitchChange }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [unfolded, setUnfolded] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenDropdown((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDropdown(false);
  };

  const handleLogout = async (e) => {
    await handleClose(e);
    dispatch(logOut());

    navigate("/");
  };

  // return focus to the button when we transitioned from !openDropdown -> openDropdown
  const prevOpen = useRef(openDropdown);
  useEffect(() => {
    if (prevOpen.current === true && openDropdown === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openDropdown;
  }, [openDropdown]);

  return (
    <nav className="absolute top-0 w-full min-h-[5vh] bg-black text-white p-2 shadow-lg border-b-2 border-black">
      <div className="flex justify-between">
        <div>
          <Link className="font-bold text-3xl" to={"/"}>
            Home
          </Link>
        </div>

        <div className="flex">
          {mode === true ? (
            <i
              onClick={() => onSwitchChange(!mode)}
              className="my-auto mr-2 text-xl fa-solid fa-sun"
            ></i>
          ) : (
            <i
              onClick={() => onSwitchChange(!mode)}
              className="my-auto mr-2 text-xl fa-solid fa-moon"
            ></i>
          )}

          <div className="hidden md:block mt-[0.4em]">
            {checkAuth() ? (
              <Stack direction="row" spacing={2}>
                <div
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={openDropdown ? "composition-menu" : undefined}
                  aria-expanded={openDropdown ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  {/* ///////////////////////////////
              {currentUser.avatar ? 
              <img src={avatar} alt="Profile Pic" />
              :
              ...
            }
              /////////////////////////////// */}
                  <i className="text-3xl cursor-pointer mt-1 mr-2 fa-solid fa-circle-user"></i>
                </div>
                <Popper
                  openDropdown={openDropdown}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            id="composition-menu"
                            aria-labelledby="composition-button"
                          >
                            <MenuItem onClick={handleClose}>
                              <Link to={"/profile"}>Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={(e) => handleLogout(e)}>
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Stack>
            ) : (
              <div id="authLink" className="flex my-auto">
                <Link to={"/register"}>Sign Up</Link>
                <Link className="mx-4" to={"/login"}>
                  Sign In
                </Link>
              </div>
            )}
          </div>

          <div className="block md:hidden">
            <div className="flex w-[3.5em] h-full items-center cursor-pointer">
              {unfolded ? (
                <i
                  onClick={() => setUnfolded(false)}
                  className="fa-solid fa-xmark mx-5 text-3xl"
                ></i>
              ) : (
                <i
                  onClick={() => setUnfolded(true)}
                  className="fa-solid fa-bars mx-5 text-3xl"
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          unfolded ? "block" : "hidden"
        } flex z-[49] flex-col items-center`}
      >
        {checkAuth() ? (
          <>
            <Link to={"/profile"}>Profile</Link>
            <Link onClick={(e) => handleLogout(e)}>Log Out</Link>
          </>
        ) : (
          <>
            <Link className="my-2" to={"/login"}>
              Sign In
            </Link>
            <Link to={"/register"}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
