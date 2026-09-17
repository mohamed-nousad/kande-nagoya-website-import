export const showToast = (message, type = 'danger') => {
  const containerId = 'app-toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = 9999;
    document.body.appendChild(container);
  }

  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  container.appendChild(toastEl);

  if (window.bootstrap) {
    const toast = new window.bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }
};