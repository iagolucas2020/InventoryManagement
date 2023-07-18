import Swal from "sweetalert2";

function AlertBasic(title, msg, status) {
  Swal.fire({
    title: title,
    text: msg,
    icon: status,
  });
}

async function AlertConfirm(title, msg, status) {
  const result = await Swal.fire({
    title: title,
    text: msg,
    icon: status,
    showDenyButton: true,
    denyButtonText: 'Não',
    confirmButtonText: 'Sim'
  });

  return result;
}

export { AlertBasic, AlertConfirm };
