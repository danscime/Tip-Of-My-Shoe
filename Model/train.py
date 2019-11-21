from imageai.Detection.Custom import DetectionModelTrainer

trainer = DetectionModelTrainer()
trainer.setModelTypeAsYOLOv3()
trainer.setDataDirectory(data_directory="rick owens ramones")
trainer.setTrainConfig(object_names_array=["Rick Owens Ramones"], batch_size=4, num_experiments=50, train_from_pretrained_model="pretrained-yolov3.h5")
# In the above,when training for detecting multiple objects,
#set object_names_array=["object1", "object2", "object3",..."objectz"]
trainer.trainModel()
