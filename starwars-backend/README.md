## Flask REST Endpoints

### 1. **Encode Star Wars Characters**
   - **Endpoint:** `/encode-characters`
   - **Method:** `POST`
   - **Description:** Encodes the faces of Star Wars characters from provided images and stores the encodings along with metadata in the MongoDB collection. Images should be placed in a specified folder.
   - **Parameters:**
     - `folder_path` (str): The path to the folder containing the images of Star Wars characters.
   - **Returns:**
     - A JSON object containing the status of the operation.

### 2. **Match Selfie**
   - **Endpoint:** `/match-selfie`
   - **Method:** `POST`
   - **Description:** Receives a selfie image, extracts and encodes the face(s), and returns the encodings. If multiple faces are detected in the image, it extracts, encodes, and saves each face separately. 
   - **Body:**
     - A form-data object containing the image file.
   - **Returns:**
     - A JSON object containing the encodings of the face(s) in the received selfie.

### Example Usage

#### Encode Characters

```sh
curl -X POST -d 'folder_path=/path/to/images' http://localhost:5000/encode-characters
```

#### Encode Selfie

```sh
curl -X POST -F 'image=@/path/to/selfie.jpg' http://localhost:5000/match-selfie
```

---

Make sure to replace placeholder texts such as `[...encoding_vector...]` with actual examples or descriptions according to your application’s implementation. Also, adjust the details as necessary to match your actual implementation of the endpoints.

