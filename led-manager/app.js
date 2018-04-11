'use strict';

const Blinkt = require('node-blinkt');
const monitor = require('node-docker-monitor');
const leds = new Blinkt();
const image = "192.168.0.101:80/resto"; // Change this.
var containers = [];

const shutdown = function () {
  leds.setAllPixels(0, 0, 0, 0);
  leds.sendUpdate();
  leds.sendUpdate();

  /* eslint-disable no-process-exit */
  process.nextTick(() => {
    process.exit(0);
  });
  /* eslint-enable no-process-exit */
};

const init = function () {
  leds.setup();
  leds.clearAll();
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

init();

const color = function (container) {
  container.animation++;

  if (container.mode === 'up') {
    if (container.animation > 10) {
      container.mode = 'running';
    }
    return [ 255, 255, 255, container.animation * 0.08 ];
  } else if (container.mode === 'down') {
    if (container.animation > 10) {
      container.mode = 'remove';
    }
    return [ 255, 0, 0, (11 - container.animation) * 0.08 ]; // Red  RGB color
  } else {
    
    // Change LED color depending of the image name.
    if (container.Image.includes('VALUE')) { // Change this.
      return [ 255, 255, 0, 0.05 ]; // Green RGB color.
    } else if (container.Image.includes('VALUE')) { // Change this.
      return [ 0, 255, 255, 0.05 ]; // Blue RGB color.
    } else {
      return [ 255, 255, 255, 0.03 ];
    }
  }
};

setInterval(() => {
  leds.setAllPixels(0, 0, 0, 0);
  var i = 7;
  containers.forEach ((container) => {
    var col = color(container);
    if (i > -1) {
      leds.setPixel(i--, col[0], col[1], col[2], col[3]);
    }
  });

  leds.sendUpdate();

  containers = containers.filter((item) => {
    return (item.mode !== 'remove');
  });

}, 1000 / 30);

monitor({
  onContainerUp: function(container) {
    container.mode = 'up';
    container.animation = 0;
    if (container.Image.startsWith(image)) {
      containers.push(container);
    }
  },
  onContainerDown: function(container) {
    container.mode = 'down';
    container.animation = 0;
    const found = containers.find((item) => {
      return (item.Id === container.Id);
    });
  }
});
