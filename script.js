// ---- CONFIGURE THIS: path to your model folder ----
const MODEL_PATH = 'model/';

let model;            
let webcam;           
const webcamContainer = document.getElementById('webcam-container');
const resultEl = document.getElementById('result');

// Load the model
async function init() {
  try {
    const modelURL = MODEL_PATH + 'model.json';
    const metadataURL = MODEL_PATH + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    console.log("✅ Model loaded successfully");
  } catch (err) {
    console.error("❌ Error loading model", err);
    resultEl.innerHTML = `<p style="color:red">Error loading model. Check MODEL_PATH.</p>`;
  }
}
init();

// Webcam controls
document.getElementById('start-webcam').addEventListener('click', async () => {
  try {
    webcam = new tmImage.Webcam(420, 320, true);
    await webcam.setup();
    await webcam.play();
    webcamContainer.innerHTML = '';
    webcamContainer.appendChild(webcam.canvas);
    document.getElementById('stop-webcam').disabled = false;
    document.getElementById('capture').disabled = false;
    document.getElementById('start-webcam').disabled = true;
    window.requestAnimationFrame(webcamLoop);
  } catch (err) {
    resultEl.innerHTML = `<p style="color:red">Unable to access webcam. Try file upload.</p>`;
    console.error(err);
  }
});

document.getElementById('stop-webcam').addEventListener('click', () => {
  if (webcam) {
    webcam.stop();
    webcamContainer.innerHTML = 'Webcam stopped';
    webcam = null;
    document.getElementById('stop-webcam').disabled = true;
    document.getElementById('capture').disabled = true;
    document.getElementById('start-webcam').disabled = false;
  }
});

async function webcamLoop() {
  if (!webcam) return;
  webcam.update();
  window.requestAnimationFrame(webcamLoop);
}

// Capture & predict from webcam
document.getElementById('capture').addEventListener('click', async () => {
  if (!webcam) return;
  const predictions = await model.predict(webcam.canvas);
  showPredictions(predictions);
});

// File upload prediction
document.getElementById('upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = document.createElement('img');
  img.classList.add('preview');
  img.src = URL.createObjectURL(file);
  img.onload = async () => {
    webcamContainer.innerHTML = '';
    webcamContainer.appendChild(img);
    const predictions = await model.predict(img);
    showPredictions(predictions);
    URL.revokeObjectURL(img.src);
  };
});

// Display predictions
function showPredictions(predictions) {
  predictions.sort((a, b) => b.probability - a.probability);
  const top = predictions.slice(0, 3);

  resultEl.innerHTML = '<h3>Predictions</h3>';
  top.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pred';
    div.innerHTML = `<b>${p.className}</b> — ${(p.probability * 100).toFixed(2)}%`;
    resultEl.appendChild(div);
  });

  if (top[0].probability > 0.7) {
    resultEl.innerHTML += `<p style="color:green"><em>Confident: ${top[0].className}</em></p>`;
  } else {
    resultEl.innerHTML += `<p style="color:orange"><em>Low confidence — consider more training images.</em></p>`;
  }
}
