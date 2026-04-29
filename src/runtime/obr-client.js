import { parseObrReference } from "./obr-reference.js";

const DEFAULT_MESSAGE_TIMEOUT = 5000;

const normalizeResourceUrl = url => url.startsWith("http") ? url : `${window.location.origin}${url}`;

const normalizePopoverOptions = options => ({
  ...options,
  url: normalizeResourceUrl(options.url)
});

const randomNonce = () => {
  if (typeof crypto?.randomUUID === "function") return `_${crypto.randomUUID()}`;

  const randomValues = new Uint32Array(4);
  crypto.getRandomValues(randomValues);
  return `_${Array.from(randomValues, value => value.toString(16).padStart(8, "0")).join("")}`;
};

class GrimwildObrMessageBus {
  constructor(reference) {
    this.reference = reference;
    this.targetOrigin = reference.origin;
    this.roomId = reference.roomId;
    this.ready = false;
    this.userId = null;
    this.ref = null;
    this.listeners = new Map();
    this.readyListeners = new Set();
    this.handleMessage = this.handleMessage.bind(this);

    window.addEventListener("message", this.handleMessage);
  }

  destroy() {
    window.removeEventListener("message", this.handleMessage);
    this.listeners.clear();
    this.readyListeners.clear();
  }

  on(eventName, listener) {
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, new Set());
    this.listeners.get(eventName).add(listener);
  }

  off(eventName, listener) {
    this.listeners.get(eventName)?.delete(listener);
  }

  onceReady(callback) {
    if (this.ready) {
      callback();
      return () => {};
    }

    this.readyListeners.add(callback);
    return () => {
      this.readyListeners.delete(callback);
    };
  }

  emit(eventName, payload) {
    const listeners = this.listeners.get(eventName);
    if (!listeners) return;

    for (const listener of listeners) listener(payload);
  }

  handleMessage(event) {
    const message = event.data;
    if (!message || typeof message.id !== "string") return;
    if (event.origin !== this.targetOrigin) return;

    if (message.id === "OBR_READY") {
      this.ready = true;
      this.ref = message.data?.ref ?? null;
      this.userId = message.data?.userId ?? null;

      for (const listener of this.readyListeners) listener();
      this.readyListeners.clear();
    }

    this.emit(message.id, message.data);
  }

  send(eventName, data, nonce) {
    if (!this.ref) throw new Error("Unable to send message: not ready");

    window.parent?.postMessage({
      id: eventName,
      data,
      ref: this.ref,
      nonce
    }, this.targetOrigin);
  }

  sendAsync(eventName, data, timeout = DEFAULT_MESSAGE_TIMEOUT) {
    const nonce = randomNonce();
    const responseEventName = `${eventName}_RESPONSE${nonce}`;
    const errorEventName = `${eventName}_ERROR${nonce}`;

    return new Promise((resolve, reject) => {
      let timeoutId;

      const cleanup = () => {
        this.off(responseEventName, handleResponse);
        this.off(errorEventName, handleError);
        if (timeoutId) window.clearTimeout(timeoutId);
      };

      const handleResponse = payload => {
        cleanup();
        resolve(payload);
      };

      const handleError = error => {
        cleanup();
        reject(error);
      };

      this.on(responseEventName, handleResponse);
      this.on(errorEventName, handleError);

      if (timeout > 0) {
        timeoutId = window.setTimeout(() => {
          cleanup();
          reject(new Error(`Message ${eventName} took longer than ${timeout}ms to get a result`));
        }, timeout);
      }

      this.send(eventName, data, nonce);
    });
  }
}

const createPlayerApi = messageBus => ({
  async getId() {
    const { id } = await messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
    return id;
  },
  async getName() {
    const { name } = await messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
    return name;
  },
  async getRole() {
    const { role } = await messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
    return role;
  },
  onChange(callback) {
    const listener = payload => {
      callback(payload.player);
    };

    messageBus.send("OBR_PLAYER_SUBSCRIBE", {});
    messageBus.on("OBR_PLAYER_EVENT_CHANGE", listener);

    return () => {
      messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {});
      messageBus.off("OBR_PLAYER_EVENT_CHANGE", listener);
    };
  }
});

const createSceneApi = messageBus => ({
  async isReady() {
    const { ready } = await messageBus.sendAsync("OBR_SCENE_IS_READY", {});
    return ready;
  },
  onReadyChange(callback) {
    const listener = payload => {
      callback(payload.ready);
    };

    messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {});
    messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", listener);

    return () => {
      messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {});
      messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", listener);
    };
  },
  async getMetadata() {
    const { metadata } = await messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
    return metadata;
  },
  async setMetadata(update) {
    await messageBus.sendAsync("OBR_SCENE_SET_METADATA", {
      update
    });
  },
  onMetadataChange(callback) {
    const listener = payload => {
      callback(payload.metadata);
    };

    messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {});
    messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", listener);

    return () => {
      messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {});
      messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", listener);
    };
  }
});

const createActionApi = messageBus => ({
  async isOpen() {
    const { isOpen } = await messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
    return isOpen;
  },
  setBadgeText(badgeText) {
    return messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", {
      badgeText
    });
  },
  setBadgeBackgroundColor(badgeBackgroundColor) {
    return messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
      badgeBackgroundColor
    });
  },
  onOpenChange(callback) {
    const listener = payload => {
      callback(payload.isOpen);
    };

    messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {});
    messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", listener);

    return () => {
      messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {});
      messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", listener);
    };
  }
});

const createPopoverApi = messageBus => ({
  async open(options) {
    await messageBus.sendAsync("OBR_POPOVER_OPEN", normalizePopoverOptions(options));
  },
  async close(id) {
    await messageBus.sendAsync("OBR_POPOVER_CLOSE", {
      id
    });
  }
});

export function createObrClient(reference = parseObrReference()) {
  const messageBus = new GrimwildObrMessageBus(reference);
  const obr = {
    onReady(callback) {
      return messageBus.onceReady(callback);
    },
    get isReady() {
      return messageBus.ready;
    },
    player: createPlayerApi(messageBus),
    scene: createSceneApi(messageBus),
    action: createActionApi(messageBus),
    popover: createPopoverApi(messageBus),
    room: {
      get id() {
        return messageBus.roomId;
      }
    },
    isAvailable: Boolean(reference.origin)
  };

  return {
    messageBus,
    obr,
    reference
  };
}
