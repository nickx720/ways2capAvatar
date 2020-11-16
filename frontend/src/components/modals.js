import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { updateUserId } from "../services/user";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
  formSubmit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "5px",
  },
}));

const SimpleModal = (props) => {
  const { id, name } = { ...props.user };
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [toastOpen, settoastOpen] = React.useState(false);
  const [value, setValue] = React.useState({ name: "", email: "", images: "" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const set = (name) => {
    return ({ target: { value, files } }) => {
      setValue((oldValues) => ({
        ...oldValues,
        [name]: value.includes("\\") ? files[0] : value,
      }));
    };
  };
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  const updateAvatarForm = (event) => {
    event.preventDefault();
    console.log(navigator.onLine);
    if (navigator.onLine) {
      updateUserId(id, value)
        .then((val) => handleClose())
        .catch((err) => console.log(err));
    } else {
      settoastOpen(true);

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          localStorage.setItem(
            id,
            JSON.stringify({ ...value, images: reader.result })
          );
          let valued = JSON.parse(localStorage.getItem(id));
          let fileUri = valued.images;
          let images = dataURLtoFile(fileUri);

          const interval = setInterval(() => {
            if (navigator.onLine) {
              updateUserId(id, { ...valued, images })
                .then((val) => handleClose())
                .catch((err) => console.log(err));
              settoastOpen(false);
              clearInterval(interval);
            }
          }, 1000);
        },
        false
      );
      reader.readAsDataURL(value.images);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update Profile Info for {name}</h2>
      <form
        onSubmit={updateAvatarForm}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name"
          value={value.name}
          onChange={set("name")}
        />
        <TextField
          id="email"
          label="Email"
          value={value.email}
          onChange={set("email")}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={set("images")}
        />
        <label htmlFor="raised-button-file">
          <Button component="span">Upload</Button>
        </label>
        <div className={classes.formSubmit}>
          <Button size="small" color="primary" type="submit">
            Save
          </Button>
          <Button size="small" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="You are offline,your update will be synced once you are online"
      ></Snackbar>
    </div>
  );
};

export default SimpleModal;
