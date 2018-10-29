//convert this over to using p5.js

const tf = window.tf;
//there are different tensor types for different tensor dimensions
const ys = tf.tensor1d([2, 2, 4, 3, 4.5, 4.5, 7, 10]);
const xs = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8]);

//in tensorflow, variables can be mutated. We will be changing the values of these variables when we run the optimizer. Here we make a scalar and turn it into a variable so we can change it.
let m = tf.scalar(Math.random()).variable();
let b = tf.scalar(Math.random()).variable();

//define your model, y=mx + b
//The tensorflow library provides mathematical operation methods to tensors that facilitate things like multiplication or addition of tensors.
const model = x => m.mul(x).add(b);

//determine how quickly to adjust the model
const learningRate = 0.01;
const optimizer = tf.train.sgd(learningRate);

//pred are the y values predicted by your model.
//actual is the actual y values in the dataset.
const loss = (pred, actual) =>
  pred
    .sub(actual)
    .square()
    .mean();
//here, we train the model. With each loop, the model is adjusted to minimize the output of our loss function.

for (let i = 0; i < 10; ++i) {
  optimizer.minimize(() => loss(model(xs), ys));
}

const modelPredictedValues = model(xs).dataSync();
// const specificPrediction = model(2.3).dataSync();
const specificPrediction = model([2.3, 11, 100]).dataSync();
console.log("prediction", specificPrediction);

function setup() {
  createCanvas(300, 300);
}
const width = 300;
const height = 300 - 2;

function draw() {
  //the datasync method returns the tensor data in the form of an array. We access it with using this dataSync method.
  const x = xs.dataSync();
  const y = ys.dataSync();

  //draw your data points
  x.map((element, idx) => {
    const x_mapped_to_canvas = map(x[idx], 0, 11, 2, width, true);
    const y_mapped_to_canvas = map(y[idx], 0, 11, 0, height, true);
    stroke("black");
    fill("black");
    ellipse(x_mapped_to_canvas, height - y_mapped_to_canvas, 7, 7);
  });

  //start and end points of regression line
  const x1 = map(x[0], 0, 11, 2, width, true);
  const y_pred_1 =
    height - map(modelPredictedValues[0], 0, 11, 0, height, true);
  const x2 = map(x[x.length - 1], 0, 11, 2, width, true);
  const y_pred_2 =
    height - map(modelPredictedValues[x.length - 1], 0, 11, 1, height, true);

  //the regression line
  stroke("red");
  line(x1, y_pred_1, x2, y_pred_2);

  stroke("black");
  //xaxis line
  line(2, height, map(11, 0, 11, 0, width, true), height);
  //yaxis line
  line(2, height, 2, 0);

  //xticks
  for (let i = 0; i < 11; ++i) {
    const x_tick = map(i, 0, 11, 2, width, true);
    line(x_tick, height - 2, x_tick, height - 4);
  }

  //yticks
  for (let i = 0; i < 11; ++i) {
    const y_tick = map(i, 0, 11, 0, height, true);
    line(2, height - y_tick, 4, height - y_tick);
  }
}
