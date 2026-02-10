import cv2
import numpy as np

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Decodes an image from bytes, converts to grayscale, resizes to 28x28,
    normalizes, and reshapes for the model.
    """
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        # Decode as color first to handle various formats, then convert
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Could not decode image")
        
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = cv2.resize(img, (28, 28))
        img = img.reshape(1, 28, 28, 1)
        img = img / 255.0
        return img
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")
