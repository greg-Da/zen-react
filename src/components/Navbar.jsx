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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/auth/authSlice";
import "./Navbar.css";

Navbar.proptypes = {
  mode: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};

export default function Navbar() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAdminDropdown, setOpenAdminDropdown] = useState(false);
  const [unfolded, setUnfolded] = useState(false);
  const anchorRef = useRef(null);
  const adminRef = useRef(null);

  const handleToggle = () => {
    setOpenDropdown((prevOpen) => !prevOpen);
  };

  const handleToggleAdmin = () => {
    setOpenAdminDropdown((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDropdown(false);
  };

  const handleCloseAdmin = (event) => {
    if (adminRef.current && adminRef.current.contains(event.target)) {
      return;
    }

    setOpenAdminDropdown(false);
  };

  const handleLogout = async (e, mobile) => {
    e.preventDefault();

    mobile ? setUnfolded(false) : await handleClose(e);
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

  const prevOpenAdmin = useRef(openAdminDropdown);
  useEffect(() => {
    if (prevOpenAdmin.current === true && openAdminDropdown === false) {
      anchorRef.current.focus();
    }

    prevOpenAdmin.current = openAdminDropdown;
  }, [openAdminDropdown]);

  return (
    <nav className="absolute top-0 z-50 w-full min-h-[5vh] bg-green text-white p-2 shadow-lg">
      <div className="flex justify-between">
        <div>
          <Link className="font-bold text-3xl" to={"/"}>
            Home
          </Link>
        </div>

        <div className="flex">
          <div className="hidden md:flex md:items-center mt-[0.4em]">
            <Link className="mr-2" to={"/store"}>
              Store
            </Link>

            {currentUser.admin && (
              <Stack direction="row" spacing={2}>
                <div
                  ref={adminRef}
                  id="admin-button"
                  aria-controls={openAdminDropdown ? "admin-menu" : undefined}
                  aria-expanded={openAdminDropdown ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggleAdmin}
                >
                  <p className="mr-2 cursor-pointer">
                    Admin <i className="fa-solid fa-chevron-down"></i>
                  </p>
                </div>
                <Popper
                  open={openAdminDropdown}
                  anchorEl={adminRef.current}
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
                        <ClickAwayListener onClickAway={handleCloseAdmin}>
                          <MenuList
                            id="admin-menu"
                            aria-labelledby="admin-button"
                          >
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/today"}>
                                Today's appointments
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/calendar"}>Calendar</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/request"}>
                                Appointments request
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/invoices"}>Invoices</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/contacts"}>Contacts</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/addArticles"}>
                                Add articles
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseAdmin}>
                              <Link to={"/admin/updates"}>Updates</Link>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Stack>
            )}

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
                  <i className="text-3xl cursor-pointer mt-1 mr-2 fa-solid fa-circle-user"></i>
                </div>
                <Popper
                  open={openDropdown}
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
                            {/* <MenuItem onClick={handleClose}>
                              <Link to={"/profile"}>Profile</Link>
                            </MenuItem> */}
                            <MenuItem onClick={(e) => handleLogout(e, false)}>
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
        <Link
          className="font-bold my-2"
          onClick={() => setUnfolded(false)}
          to={"/store"}
        >
          Store
        </Link>
        {currentUser.admin && (
          <>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/today"}
            >
              Today's appointments
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/calendar"}
            >
              Calendar
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/request"}
            >
              Appointments request
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/invoices"}
            >
              Invoices
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/contacts"}
            >
              Contacts
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/addArticles"}
            >
              Add articles
            </Link>
            <Link
              className="font-bold my-2"
              onClick={() => setUnfolded(false)}
              to={"/admin/updates"}
            >
              Updates
            </Link>
          </>
        )}

        {checkAuth() ? (
          <>
            {/* <Link className="my-2 font-bold" onClick={() => setUnfolded(false)} to={"/profile"}>
              Profile
            </Link> */}
            <Link className="my-2 font-bold" onClick={(e) => handleLogout(e, true)}>Log Out</Link>
          </>
        ) : (
          <>
            <Link
              onClick={() => setUnfolded(false)}
              className="my-2 font-bold"
              to={"/login"}
            >
              Sign In
            </Link>
            <Link
              className="font-bold"
              onClick={() => setUnfolded(false)}
              to={"/register"}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
