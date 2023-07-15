import Swal from "sweetalert2";

function AlertBasic(title, msg, status) {
  Swal.fire(title, msg, status);
};

export default AlertBasic;
