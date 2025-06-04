const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    boxShadow: "0 1px 8px rgba(230, 57, 70, 0.2)",
    border: "none",
    background: "transparent",
    padding: 0,
  },
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(5px)",
  },
};

export default modalStyles;
