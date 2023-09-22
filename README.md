
# StarWars Look-a-Like Finder

<img src="starwars-frontend/public/starwars-face-recognition.png" width="50%" height="50%">

## Overview
This application is a distinctive and entertaining platform that allows users to discover which StarWars character they resemble the most, utilizing advanced vector search and face recognition technologies. It integrates the robustness of a React-based frontend, MongoDB Atlas Vector Search, and Python Face Recognition API to offer a seamless and enjoyable user experience.

## Features
1. **User-Friendly Interface**: Built with React, the application provides an intuitive interface, allowing users to effortlessly upload their selfies.
2. **Advanced Face Recognition**: Employs Python's face_recognition library to accurately encode and compare facial features, ensuring precise results.
3. **Vector Search Capability**: Uses MongoDB Atlas Vector Search to determine the most resembling StarWars character, providing fast and efficient matching.
4. **Robust Database Interaction**: Seamlessly interacts with MongoDB to securely store and retrieve character data, maintaining the integrity and reliability of the application.

## Detailed Workflow
### Frontend
1. **React-based User Interface**: Enables users to interact with the application in a user-friendly manner, uploading their selfies with minimal hassle.
2. **Responsive Design**: Ensures optimal viewing and interaction experience across a wide range of devices, from desktops to mobile phones.

### Backend
1. **Python Face Recognition**: The backend is powered by the renowned Python face_recognition library, which analyzes the uploaded images and encodes the faces for comparison.
2. **MongoDB Integration**: The application communicates with MongoDB to efficiently store and retrieve the necessary character data, ensuring the scalability and performance of the application.

### Matching Process
1. **Vector Search**: Once the faces are encoded, the application performs a vector search to find the StarWars character with the most similar facial features.
2. **Result Presentation**: After processing, the application swiftly presents the user with the StarWars character they most resemble.

## Technologies Used
- **Frontend**: React
- **Backend**: Python, face_recognition library
- **Database**: MongoDB Atlas
- **Vector Search**: MongoDB Atlas Vector Search
- **Other**: CSS, HTML, JavaScript

## Potential Use Cases
This application is not just a source of entertainment but can also serve as a reference or starting point for developers looking to integrate face recognition and vector search in their projects. It can be used as an educational tool for those interested in learning about the integration of different technologies to create a cohesive application.

## Prerequisites

- Node.js and npm: [Download and Install](https://nodejs.org/en/download/)
- Python 3: [Download and Install](https://www.python.org/downloads/)
- MongoDB Atlas: A MongoDB Atlas Cluster Created

## Getting Started

### Configuration

#### Backend

1. Update the `MONGO_URI` in the Flask application flask_server.py with your MongoDB URI.
2. If using MongoDB Atlas, make sure to whitelist your IP address in the Network Access settings.

### Set up the Backend and create vectors for images using `face_recognition` Python library
Navigate to the backend directory and install the required Python packages:

```sh
cd starwars-backend
pip install -r requirements.txt
python flask_server.py
# Only run the encode-characters the first time you setup, as it will generate vectors for all starwars_characters_images 
# and store them in a MongoDB namepspace: starwars.characters
curl -X POST http://127.0.0.1:5000/encode-characters -H "Content-Type: application/json" -d '{"path": "starwars_characters_images"}'
```

### Create Atlas Search Index
Create Atlas Search index, on database starwars and collection characters using the JSON config and lappy below config
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

## Conclusion
The StarWars Look-a-Like Finder is a captivating application that combines modern technologies to provide users with an amusing way to find their StarWars twin. Its user-friendly interface, advanced face recognition capabilities, and efficient database interactions ensure that users receive accurate and swift results, making it an exciting and educational platform for StarWars fans and tech enthusiasts alike.

- [DB Rankings Vector Databases](https://db-engines.com/en/ranking/vector+dbms/all)

