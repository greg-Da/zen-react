import { PropTypes } from "prop-types";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { createContext, useState } from "react";
import { useContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <AlertBox />
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.proptypes = {
  children: PropTypes.node.isRequired,
};

export default function AlertBox() {
  const { alert, setAlert } = useContext(AlertContext);

  if (!alert) return null;
  else {
    setTimeout(() => {
      setAlert(null);
    }, 15000);
  }
  return (
    <div className="z-20 absolute w-full">
      <Collapse className="max-w-md md:max-w-lg m-auto" in={alert !== null}>
        <Alert
          severity={alert.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(null);
              }}
            >
              <i className="fa-solid fa-x"></i>
            </IconButton>
          }
        >
          {alert.text}
        </Alert>
      </Collapse>
    </div>
  );
}

AlertBox.proptypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};
