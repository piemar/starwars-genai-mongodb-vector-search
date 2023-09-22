
# Star Wars Face Recognition App
This application uses a React frontend to allow users to take a selfie and send it to a Python Flask backend. The backend utilizes the `face_recognition` library to encode the faces and interacts with MongoDB to store and retrieve character data.

<img src="starwars-frontend/public/starwars-face-recognition.png" width="50%" height="50%">


## Prerequisites

- Node.js and npm: [Download and Install](https://nodejs.org/en/download/)
- Python 3: [Download and Install](https://www.python.org/downloads/)
- MongoDB Atlas: A MongoDB Atlas Cluster Created

## Getting Started

### Configuration

#### Backend

1. Update the 'MONGO_URI' in the Flask application flask_server.py with your MongoDB URI.
2. If using MongoDB Atlas, make sure to whitelist your IP address in the Network Access settings.

### Set up the Backend and create encodings for images
Navigate to the backend directory and install the required Python packages:

```sh
cd starwars-backend
pip install -r requirements.txt
python flask_server.py
# Only run the encode-characters the first time you setup, as it will generate vectors for all starwars_characters_images
curl -X POST http://127.0.0.1:5000/encode-characters -H "Content-Type: application/json" -d '{"path": "starwars_characters_images"}'
```

### Create Atlas Search Index
Create Atlas Search index, on database starwars and collection characters using the JSON config and appy bellow config
```json
{
    "mappings": {
        "dynamic": true,
        "fields": {
            "encoding": {
                "dimensions": 128,
                "similarity": "euclidean",
                "type": "knnVector"
            }
        }
    }
}
```
### Set up and start the Frontend 

Navigate to the frontend directory and install the required npm packages:

```sh
cd starwars-frontend
npm install
npm start
```

The React application should now be running on [http://localhost:3000](http://localhost:3000), and the Flask application should be running on [http://localhost:5000](http://localhost:5000).

### Using the Application

1. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Click the choose file button to select a selfie picture to match against Starwars characters
3. The application will encode the selfie and interact with the backend to retrieve related Star Wars characters.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments
- The `face_recognition` Python library for providing the face encoding functionality.
## Clean up
- Delete contents of characters collection in starwars database, run below from mongoshell.

```sh
use starwars
db.characters.deleteMany({})
```
- Delete content of folder starwars_frontend/public/extracted_faces

Doing the above means that you will need to regenerate the vectors for the starwars characters using the below:
```sh
curl -X POST http://127.0.0.1:5000/encode-characters -H "Content-Type: application/json" -d '{"path": "starwars_characters_images"}'
```
---

