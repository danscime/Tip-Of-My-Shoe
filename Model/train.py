from imageai.Detection.Custom import DetectionModelTrainer

'''
["Rick Owens Ramones", "Rick Owens Geobaskets", "Rick Owens x Adidas Runners", "Rick Owens x Adidas Tech Runners", "Rick Owens x Adidas Level Runners", "Balenciaga Arenas", "Balenciaga Speed Sneaker", "Balenciaga Tripple S", "Common Project Achillies Low", "Common Project Chelsea Boot", "Dr Martens 1460"]
'''

trainer = DetectionModelTrainer()
trainer.setModelTypeAsYOLOv3()
trainer.setDataDirectory(data_directory="shoetect")
trainer.setTrainConfig(object_names_array=["Rick Owens Ramones", "Rick Owens Geobaskets", "Rick Owens x Adidas Runners", "Rick Owens x Adidas Tech Runners", "Rick Owens x Adidas Level Runners", "Balenciaga Arenas", "Balenciaga Speed Sneaker", "Balenciaga Tripple S", "Common Project Achillies Low", "Common Project Chelsea Boot", "Dr Martens 1460"], batch_size=4, num_experiments=50, train_from_pretrained_model="pretrained-yolov3.h5")

trainer.trainModel()
