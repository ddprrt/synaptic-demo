'use strict';

const synaptic = require('synaptic');

const colors = require('./colors');

const learningRate = 0.4;
const network = new synaptic.Architect.LSTM(3, 10, 10, 3);

const toNumber = (el) => {
  return [parseInt(`0x${el[1]}${el[2]}`) / 255,
    parseInt(`0x${el[3]}${el[4]}`) / 255,
    parseInt(`0x${el[5]}${el[6]}`) / 255]
};

for(var i = 0; i < 1000; i++) {
  colors.blues.forEach(el => {
    network.activate(toNumber(el));
    network.propagate(learningRate, toNumber('#0000ff'));
  });

  colors.reds.forEach(el => {
    network.activate(toNumber(el));
    network.propagate(learningRate, toNumber('#ff0000'));
  });

  colors.greens.forEach(el => {
    network.activate(toNumber(el));
    network.propagate(learningRate, toNumber('#00ff00'));
  });
}

colors.oranges.forEach(el => {
  let result = network.activate(toNumber(el));
  result = result
    .map(el => el * 255)
    .map(el => parseInt(el))
    .join(',');
  const str = `<div class="wrapper">
<div class="box" style="background-color: ${el};"></div>
<div class="box" style="background-color: rgb(${result});"></div></div>`;
  console.log(str);
});
