import numpy 


def detect_shoes(image_path):
    from imageai.Detection.Custom import CustomObjectDetection

    detector = CustomObjectDetection()
    detector.setModelTypeAsYOLOv3()
    detector.setModelPath("../data/shoetect.h5")
    detector.setJsonPath("../data/detection_config.json")
    detector.loadModel()
    detections = detector.detectObjectsFromImage(input_image=image_path, output_image_path='../detected_images/image.jpg', minimum_percentage_probability=95)
    
    return [{'name': detection['name'], 'percentage_probability': detection['percentage_probability'], 'box_points': detection['box_points']} for detection in detections]
