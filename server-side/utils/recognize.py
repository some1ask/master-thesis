from typing import Text
from numpy.core.fromnumeric import partition
from numpy.lib.utils import source
import pytesseract
import numpy as np
import cv2
import sys
import re
import base64
import io
import pandas as pd
from matplotlib import pyplot as plt
from io import StringIO
from io import BytesIO
from pytesseract import Output
from PIL import Image
pytesseract.pytesseract.tesseract_cmd=r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def gray(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img

# blur
def blur(img) :
    img_blur = cv2.GaussianBlur(img,(5,5),0)
    return img_blur

# threshold
def threshold(img):
    #pixels with value below 100 are turned black (0) and those with higher value are turned white (255)
    img = cv2.threshold(img, 100, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY)[1]
    return img

def sharpen_image(im):
  kernel = np.ones((3,3),np.float32)/90
  im = cv2.filter2D(im,-1,kernel)
  return im

# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,5)
 
#thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

#dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)
    
#erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)

#opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)

#canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)

#skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

#type of image
def get_type(type):
    print(type[6:])
    return type[6:]

#image resizing
def resizeImage(image):
    scale = 50
    width = int(image.shape[0] * scale/100)
    height = int(image.shape[1] * scale/100)
    dim = (width,height)
    return cv2.resize(image, dim, interpolation = cv2.INTER_AREA)

#conveting base to image
def data_uri_to_cv2_img(uri):
    image = Image.open(BytesIO(base64.b64decode(uri.split(',')[1])))
    return cv2.cvtColor(np.array(image), cv2.IMREAD_COLOR)
#main function
def recs(obj):
  image_string = "data:"+str(obj['type'])+";base64,"+str(obj['base64'])
  language = str(obj['language'])

  img = data_uri_to_cv2_img(image_string)
#   resized = resizeImage(img)
#   img = cv2.imread('image.jpg',cv2.IMREAD_COLOR)
  cv2.imshow('cnt',img)
  cv2.waitKey(0)

  im_gray = gray(img)
  im_blur = blur(im_gray)
  im_open = opening(im_blur)
  im_thresh = threshold(im_open)
#   noise_remove = remove_noise(im_open)

  contours, _ = cv2.findContours(im_thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 
  recognized_text = find_contours(im_thresh,contours,language)
  beautified_text = beautify_text(recognized_text)
  print(recognized_text)
  return recognized_text


def find_contours(img,contours,language):
    config = ('--oem 3 --psm 3')
    result=""
    for cnt in contours: 
        x, y, w, h = cv2.boundingRect(cnt) 

        # drawing a rectangle on copied image 
        rect = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 255), 2) 
        # use for debugging
        # cv2.imshow('cnt',rect)
        # cv2.waitKey()

        # cropped image fro tesseract 
        cropped = img[y:y + h, x:x + w] 

        # apply tesseract on rect part 
        if language == 'ukr':
            result = result + pytesseract.image_to_string(cropped, config=config,lang='ukr')
            result = result.strip()
        elif language == 'rus':
            result = result + pytesseract.image_to_string(cropped, config=config,lang='rus')
            result = result.strip()
        else:
            result = result + pytesseract.image_to_string(cropped, config=config,lang='eng')
            result = result.strip()
    return result
#used for debugging    
def beautify_text(string):
    return re.sub('\n','',string)