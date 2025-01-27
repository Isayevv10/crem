import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertHandlerService {
  constructor() {}

  handlerError(error: any) {
    let message: string = '';
    const errorValue = error?.error ?? error;

    if (typeof errorValue === 'string') {
      message = errorValue;
    } else if (errorValue) {
      message = errorValue.message || 'An error occurred';
    }

    Swal.fire({
      text: message,
      icon: 'error',
      showConfirmButton: true,
    });
  }

  handleSuccess(message: string, time: number) {
    Swal.fire({
      text: message,
      icon: 'success',
      timer: time,
      showConfirmButton: false,
    });
  }
}
