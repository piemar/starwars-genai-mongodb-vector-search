## Flask REST Endpoints

### 1. **Encode Star Wars Characters**
   - **Endpoint:** `/encode-characters`
   - **Method:** `POST`
   - **Description:** Encodes the faces of Star Wars characters from provided images and stores the encodings along with metadata in the MongoDB collection. Images should be placed in a specified folder.
   - **Parameters:**
     - `folder_path` (str): The path to the folder containing the images of Star Wars characters.
   - **Returns:**
     - A JSON object containing the status of the operation.

### 2. **Encode Selfie**
   - **Endpoint:** `/encode-selfie`
   - **Method:** `POST`
   - **Description:** Receives a selfie image, extracts and encodes the face(s), and returns the encodings. If multiple faces are detected in the image, it extracts, encodes, and saves each face separately.
   - **Body:**
     - A form-data object containing the image file.
   - **Returns:**
     - A JSON object containing the encodings of the face(s) in the received selfie.

### 3. **Search Characters**
   - **Endpoint:** `/search-characters`
   - **Method:** `POST`
   - **Description:** Receives a face encoding and searches the MongoDB collection for matching Star Wars character encodings using VectorSearch.
   - **Body:**
     - A JSON object containing the encoding vector to be searched.
   - **Returns:**
     - A JSON object containing the matched Star Wars characters from the MongoDB collection.

### Example Usage

#### Encode Characters

```sh
curl -X POST -d 'folder_path=/path/to/images' http://localhost:5000/encode-characters
```

#### Encode Selfie

```sh
curl -X POST -F 'image=@/path/to/selfie.jpg' http://localhost:5000/encode-selfie
```

#### Search Characters

```sh
curl -X POST -H "Content-Type: application/json" -d '{"encoding": [...encoding_vector...]}' http://localhost:5000/search-characters
```

---

Make sure to replace placeholder texts such as `[...encoding_vector...]` with actual examples or descriptions according to your application’s implementation. Also, adjust the details as necessary to match your actual implementation of the endpoints.

