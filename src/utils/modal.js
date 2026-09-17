const RETRY_MS = 50;
const retryTimers = {};

const clearRetry = (modalId) => {
  if (retryTimers[modalId]) {
    clearTimeout(retryTimers[modalId]);
    retryTimers[modalId] = null;
  }
};

const toggleModal = (modalId, visible) => {
  clearRetry(modalId);

  const modalEl = document.getElementById(modalId);
  if (!modalEl) return;

  if (!window.bootstrap) {
    retryTimers[modalId] = setTimeout(() => toggleModal(modalId, visible), RETRY_MS);
    return;
  }

  const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
  visible ? modal.show() : modal.hide();
};

export const open = (modalId) => toggleModal(modalId, true);
export const close = (modalId) => toggleModal(modalId, false);