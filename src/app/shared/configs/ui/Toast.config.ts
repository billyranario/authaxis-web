import { SweetAlertOptions } from "sweetalert2";

export const ToastConfig = {
  sizes: {
    sm: '340px',
    md: '500px',
    lg: '800px',
    xl: '1000px',
    '2xl': '1200px',
    '3xl': '1400px',
  },
  duration: 3000,
};

export const ToastOptions: SweetAlertOptions = {
  customClass: 'swal2-toast',
  position: 'center',
  icon: 'success',
  showConfirmButton: false,
  showCloseButton: true,
  width: ToastConfig.sizes.sm,
  timer: ToastConfig.duration,
};
