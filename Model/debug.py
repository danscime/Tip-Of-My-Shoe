#!/usr/bin/env python3

import os
import xml.etree.ElementTree as ET
import pickle
import random
import numpy as np


def parse_voc_annotation(ann_dir, img_dir, cache_name, labels=[]):
    if os.path.exists(cache_name):
        with open(cache_name, 'rb') as handle:
            cache = pickle.load(handle)
        all_insts, seen_labels = cache['all_insts'], cache['seen_labels']
    else:
        all_insts = list()
        seen_labels = dict()

        for ann in sorted(os.listdir(ann_dir)):
            img = {'object': list()}

            try:
                tree = ET.parse(os.path.join(ann_dir, ann))
            except Exception as e:
                print(e)
                print('Ignore this bad annotation: ' + os.path.join(ann_dir, ann))
                continue

            for elem in tree.iter():
                if 'filename' in elem.tag:
                    img['filename'] = os.path.join(img_dir, elem.text)
                if 'width' in elem.tag:
                    img['width'] = int(elem.text)
                if 'height' in elem.tag:
                    img['height'] = int(elem.text)
                if 'object' in elem.tag or 'part' in elem.tag:
                    obj = {}

                    for attr in list(elem):
                        if 'name' in attr.tag:
                            obj['name'] = attr.text

                            if obj['name'] in seen_labels:
                                seen_labels[obj['name']] += 1
                            else:
                                seen_labels[obj['name']] = 1

                            if len(labels) > 0 and obj['name'] not in labels:
                                break
                            else:
                                img['object'] += [obj]

                        if 'bndbox' in attr.tag:
                            for dim in list(attr):
                                if 'xmin' in dim.tag:
                                    obj['xmin'] = int(round(float(dim.text)))
                                if 'ymin' in dim.tag:
                                    obj['ymin'] = int(round(float(dim.text)))
                                if 'xmax' in dim.tag:
                                    obj['xmax'] = int(round(float(dim.text)))
                                if 'ymax' in dim.tag:
                                    obj['ymax'] = int(round(float(dim.text)))

            if len(img['object']) > 0:
                all_insts += [img]

        cache = {'all_insts': all_insts, 'seen_labels': seen_labels}
        with open(cache_name, 'wb') as handle:
            pickle.dump(cache, handle, protocol=pickle.HIGHEST_PROTOCOL)

    return all_insts, seen_labels

def IOU(ann, centroids):
    w, h = ann
    similarities = []

    for centroid in centroids:
        c_w, c_h = centroid

        if c_w >= w and c_h >= h:
            similarity = w*h/(c_w*c_h)
        elif c_w >= w and c_h <= h:
            similarity = w*c_h/(w*h + (c_w-w)*c_h)
        elif c_w <= w and c_h >= h:
            similarity = c_w*h/(w*h + c_w*(c_h-h))
        else: #means both w,h are bigger than c_w and c_h respectively
            similarity = (c_w*c_h)/(w*h)
        similarities.append(similarity) # will become (k,) shape

    return np.array(similarities)


def avg_IOU(anns, centroids):
    n,d = anns.shape
    sum = 0.

    for i in range(anns.shape[0]):
        sum+= max(IOU(anns[i], centroids))

    return sum/n


def run_kmeans(ann_dims, anchor_num):
    ann_num = ann_dims.shape[0]
    iterations = 0
    prev_assignments = np.ones(ann_num)*(-1)
    iteration = 0
    old_distances = np.zeros((ann_num, anchor_num))

    indices = [random.randrange(ann_dims.shape[0]) for i in range(anchor_num)]
    centroids = ann_dims[indices]
    anchor_dim = ann_dims.shape[1]

    while True:
        distances = []
        iteration += 1
        for i in range(ann_num):
            d = 1 - IOU(ann_dims[i], centroids)
            distances.append(d)
        distances = np.array(distances) # distances.shape = (ann_num, anchor_num)

        #assign samples to centroids
        assignments = np.argmin(distances,axis=1)

        if (assignments == prev_assignments).all() :
            return centroids

        #calculate new centroids
        centroid_sums=np.zeros((anchor_num, anchor_dim), np.float)
        for i in range(ann_num):
            centroid_sums[assignments[i]]+=ann_dims[i]
        for j in range(anchor_num):
            centroids[j] = centroid_sums[j]/(np.sum(assignments==j) + 1e-6)

        prev_assignments = assignments.copy()
        old_distances = distances.copy()


def generateAnchors(train_annotation_folder, train_image_folder, train_cache_file, model_labels):

    print("Generating anchor boxes for training images and annotation...")
    num_anchors = 9

    train_imgs, train_labels = parse_voc_annotation(
        train_annotation_folder,
        train_image_folder,
        train_cache_file,
        model_labels
    )

    # run k_mean to find the anchors
    annotation_dims = []
    for image in train_imgs:

        print(image['filename'])
       
        for obj in image['object']:
            relative_w = (float(obj['xmax']) - float(obj['xmin']))/image['width']
            relative_h = (float(obj["ymax"]) - float(obj['ymin']))/image['height']

    return anchor_array, reverse_anchor_array

# script part

data_directory="/home/lucas/Projects/shoetect"
train_images_folder = os.path.join(data_directory, "train", "images")
train_annotations_folder = os.path.join(data_directory, "train", "annotations")
validation_images_folder = os.path.join(data_directory, "validation", "images")
validation_annotations_folder = os.path.join(data_directory, "validation", "annotations")
train_cache_file = os.path.join(data_directory, "cache", "detection_train_data.pkl")
labels=sorted(["Rick Owens Ramones", "Rick Owens Geobaskets", "Rick Owens x Adidas Runners", "Rick Owens x Adidas Tech Runners", "Rick Owens x Adidas Level Runners", "Balenciaga Arenas", "Balenciaga Speed Sneaker", "Balenciaga Tripple S", "Common Project Achillies Low", "Common Project Chelsea Boot", "Dr Martens 1460"])
print(data_directory)
print(train_annotations_folder)
print(data_directory)
print(data_directory)
print(data_directory)
generateAnchors(train_annotations_folder, train_images_folder, train_cache_file, labels)
