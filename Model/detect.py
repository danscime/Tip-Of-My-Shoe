#!/usr/bin/env python3
from imageai.Detection.Custom import CustomObjectDetection
import sys

arg = sys.argv[1]
inp = arg
split = arg.split(".")
out = split[0]+"-detected."+split[1]

detector = CustomObjectDetection()
detector.setModelTypeAsYOLOv3()
detector.setModelPath("ramone_model.h5")
detector.setJsonPath("detection_config.json")
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=inp, output_image_path=out)
for detection in detections:
    print(detection["name"], " : ", detection["percentage_probability"], " : ", detection["box_points"])
