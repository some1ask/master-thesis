from flask import Flask, json, request, jsonify, Response
from numpy import result_type
import pytesseract
from markupsafe import escape
from utils.recognize import recs
pytesseract.pytesseract.tesseract_cmd=r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)

@app.route("/<userID>",methods=['GET','POST'])
def run(userID):
    if request.method == 'POST':
        # print(request['firstParam'])
        data = request.get_json(); 
        
        result = recs(data)
        # data_uri_to_cv2_img(data)
        # print(result)
        return jsonify(recognizedText = result)
    if request.method == 'GET':
        print(request)
    return jsonify(content)

if __name__ == '__main__':
    app.run(debug=True)