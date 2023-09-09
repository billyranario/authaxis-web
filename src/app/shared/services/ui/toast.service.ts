import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

// CONFIGS
import { ToastOptions } from '../../configs/ui/Toast.config';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  show(params: SweetAlertOptions): void {
    Swal.fire({
      title: params.title,
      text: params.text,
      icon: params.icon || ToastOptions.icon,
      position: params.position || ToastOptions.position,
      timer: params.timer || ToastOptions.timer,
      showConfirmButton: params.showConfirmButton || ToastOptions.showConfirmButton,
      showCloseButton: params.showCloseButton || ToastOptions.showCloseButton,
      width: params.width || ToastOptions.width,
      customClass: params.customClass || ToastOptions.customClass,
    });
  }

  close() {
    Swal.close();
  }
}
