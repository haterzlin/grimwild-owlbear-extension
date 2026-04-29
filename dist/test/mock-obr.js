(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mockOwlbear") !== "1") return;

  const clone = value => JSON.parse(JSON.stringify(value));
  const listeners = {
    ready: [],
    sceneReadyChange: [],
    metadataChange: [],
    playerChange: [],
    actionOpenChange: []
  };

  const metadata = {
    "grimwild.character.extension/metadata": {},
    "grimwild.pool.extension/metadata": {},
    "grimwild.extension/metadata": {},
    "grimwild.gm.extension/metadata": {
      suspense: "0"
    },
    "grimwild.date.extension/metadata": Date.now()
  };

  const player = {
    id: "test-player",
    name: "Test GM",
    role: "GM"
  };

  const actionState = {
    isOpen: true,
    badgeText: undefined,
    badgeBackgroundColor: undefined
  };

  const sharedPopoverHost = window.opener?.__grimwildMockPopoverHost ?? {
    state: {
      lastOpen: null,
      closedIds: [],
      isOpen: false
    },
    popupWindow: null
  };
  window.__grimwildMockPopoverHost = sharedPopoverHost;

  const buildMockPopoverUrl = url => {
    const target = new URL(url, window.location.origin);
    target.searchParams.set("mockOwlbear", "1");
    return target.toString();
  };

  const notify = (type, payload) => {
    for (const listener of listeners[type]) listener(payload);
  };

  const on = (type, listener) => {
    listeners[type].push(listener);
    return () => {
      const index = listeners[type].indexOf(listener);
      if (index >= 0) listeners[type].splice(index, 1);
    };
  };

  const obr = {
    isReady: true,
    isAvailable: true,
    room: {
      id: "test-room"
    },
    onReady(callback) {
      callback();
    },
    player: {
      async getId() {
        return player.id;
      },
      async getName() {
        return player.name;
      },
      async getRole() {
        return player.role;
      },
      onChange(callback) {
        return on("playerChange", callback);
      }
    },
    scene: {
      async isReady() {
        return true;
      },
      onReadyChange(callback) {
        listeners.sceneReadyChange.push(callback);
        callback(true);
        return () => {
          const index = listeners.sceneReadyChange.indexOf(callback);
          if (index >= 0) listeners.sceneReadyChange.splice(index, 1);
        };
      },
      async getMetadata() {
        return clone(metadata);
      },
      setMetadata(next) {
        Object.assign(metadata, clone(next));
        metadata["grimwild.date.extension/metadata"] = Date.now();
        notify("metadataChange", clone(metadata));
      },
      onMetadataChange(callback) {
        return on("metadataChange", callback);
      }
    },
    action: {
      setBadgeBackgroundColor(color) {
        actionState.badgeBackgroundColor = color;
      },
      setBadgeText(text) {
        actionState.badgeText = text;
      },
      async isOpen() {
        return actionState.isOpen;
      },
      onOpenChange(callback) {
        return on("actionOpenChange", callback);
      }
    },
    popover: {
      async open(options) {
        sharedPopoverHost.state.lastOpen = clone(options);
        sharedPopoverHost.state.isOpen = true;
        const popupUrl = buildMockPopoverUrl(options.url);
        sharedPopoverHost.popupWindow = window.open(popupUrl, options.id, "popup,width=300,height=600");
      },
      close(id) {
        sharedPopoverHost.state.closedIds.push(id);
        sharedPopoverHost.state.isOpen = false;
        if (sharedPopoverHost.popupWindow && !sharedPopoverHost.popupWindow.closed) {
          sharedPopoverHost.popupWindow.close();
        } else if (window.opener && !window.closed) {
          window.close();
        }
      }
    }
  };

  window.__grimwild_test_obr = obr;
  window.__grimwildTestApi = {
    getMetadata() {
      return clone(metadata);
    },
    setMetadata(next) {
      obr.scene.setMetadata(next);
    },
    setCharacters(characters) {
      const byId = {};
      for (const character of characters) byId[character.id] = character;
      obr.scene.setMetadata({
        "grimwild.character.extension/metadata": byId
      });
    },
    setActionOpen(isOpen) {
      actionState.isOpen = isOpen;
      notify("actionOpenChange", isOpen);
    },
    getActionState() {
      return clone(actionState);
    },
    getPlayer() {
      return clone(player);
    },
    getPopoverState() {
      return clone(sharedPopoverHost.state);
    }
  };
})();
