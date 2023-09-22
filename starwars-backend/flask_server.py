from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import face_recognition
import os
from PIL import Image

app = Flask(__name__)
CORS(app)
# MongoDB Configuration


mongo = MongoClient("MONGODB_URI")
extracted_faces_folder = '../starwars-frontend/public/extracted_faces'  # Update with your preferred location

if not os.path.exists(extracted_faces_folder):
    os.makedirs(extracted_faces_folder)


@app.route('/encode-characters', methods=['POST'])
def encode_characters():
    query={}
    # Deletes existing vectors in characters collection so we dont get duplicates when running encode-characters multiple times.    
    mongo.starwars.characters.delete_many(query)    
    folder_path = os.getcwd()+"/"+request.json.get('path')
    if not folder_path or not os.path.exists(folder_path):
        return jsonify({'error': 'Invalid path'}), 400

    for image_name in os.listdir(folder_path):
        image_path = os.path.join(folder_path, image_name)
        image = face_recognition.load_image_file(image_path)
        face_locations = face_recognition.face_locations(image)
        encodings = face_recognition.face_encodings(image, face_locations)

        for i, (top, right, bottom, left) in enumerate(face_locations):
            face_image = Image.fromarray(image[top:bottom, left:right])
            filename = f"{os.path.splitext(image_name)[0]}_face_{i}.jpg"
            filepath = os.path.join(extracted_faces_folder, filename)
            face_image.save(filepath)

            character = {
                'name': os.path.splitext(image_name)[0],
                'filename': filename,
                'encoding': encodings[i].tolist(),
            }
            mongo.starwars.characters.insert_one(character)
    return jsonify({'status': 'success'}), 200


@app.route('/encode-selfie', methods=['POST'])
def encode_selfie():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    image = face_recognition.load_image_file(file)
    encoding = face_recognition.face_encodings(image)
    
    if not encoding:
        return jsonify({'error': 'Could not encode image'}), 400
    result = mongo['starwars']['characters'].aggregate([
        {
            '$search': {
                'knnBeta': {
                    'vector': encoding[0].tolist(), 
                    'path': 'encoding', 
                    'k': 20
                }
            }
        }, {
            '$project': {
                '_id':-1,
                'name': 1, 
                'filename': 1, 
                'score': {
                    '$meta': 'searchScore'
                }
            }
        }
    ])
    
    results = []
    for doc in result:
        # Convert ObjectId to string if it's in the document
        if '_id' in doc:
            doc['_id'] = str(doc['_id'])
            
        # add the document to results
        results.append(doc)    
    return jsonify(results), 200  # Return list as JSON

if __name__ == '__main__':
    app.run(debug=True)
