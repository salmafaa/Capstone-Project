import keras
import tensorflow as tf
from flask import Flask, redirect, url_for, request, render_template
from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from keras.models import load_model
from keras.preprocessing import image
import numpy as np


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('detection.html')

model = tf.keras.models.load_model('model.h5')
model.make_predict_function()

@app.route('/', methods=['GET'])
def main():
    return render_template('detection.html')

@app.route('/', methods=['POST'])
def predict():
    imagefile = request.files['imagefile']
    image_path = "./static/" + imagefile.filename
    imagefile.save(image_path)

    image = load_img(image_path, target_size=(150, 150))
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    pred = model.predict(image)
    pred=np.argmax(pred, axis=1)
    if pred == 0:
        desc = 'Normal'
    elif pred == 1:
        desc = 'Pneumonia'

    classification = '%s' % (desc)

    return render_template('detection.html', prediction=classification, image=image_path)

if __name__ == '__main__':
    print('*** App Started ***')
    app.run(debug=True,port='5000',host='0.0.0.0')