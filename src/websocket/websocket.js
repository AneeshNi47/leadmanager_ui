// WebSocketUtility.js

const WebSocketUtility = {
  ws: null,

  connect: function (WS_URL, onMessageCallback) {
    this.ws = new WebSocket(`${WS_URL}/ws/leads/`);
    this.ws.onopen = () => {
      console.log("Connected to the WebSocket");
    };
    this.ws.onmessage = onMessageCallback;
    this.ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };
    this.ws.onclose = () => {
      console.log("Disconnected from the WebSocket");
    };
    return this.ws;
  },

  disconnect: function () {
    if (this.ws) {
      this.ws.close();
    }
  },
};

export default WebSocketUtility;
