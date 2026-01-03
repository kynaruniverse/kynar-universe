/* ==========================================================================
   CORE | EVENT BUS (PUB/SUB ENGINE)
   ========================================================================== */

/**
 * A lightweight event management system.
 * Allows modules to communicate without direct dependencies.
 */
export const EventBus = {
  events: {},

  /**
   * Subscribe to an event.
   * @param {string} eventName - The name of the event (e.g., 'CART:ADD')
   * @param {Function} callback - The function to run when event triggers
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },

  /**
   * Emit an event to all subscribers.
   * @param {string} eventName - The name of the event
   * @param {any} data - Data to pass to subscribers
   */
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
};

/* --- STANDARD EVENT DICTIONARY --- */
export const EVENTS = {
  APP_INIT:      'app:init',
  CART_ADD:      'cart:add',
  CART_REMOVE:   'cart:remove',
  CART_TOGGLE:   'cart:toggle',
  FILTER_CHANGE: 'shop:filter',
  MODAL_OPEN:    'modal:open',
  MODAL_CLOSE:   'modal:close',
  THEME_TOGGLE:  'theme:toggle'
};
