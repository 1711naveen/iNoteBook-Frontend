import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Handle the selected image, e.g., set it to state
        setSelectedImage(file);
    };

    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
                {/* Display the selected image or an empty box */}
                {selectedImage ? (
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Image"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                ) : (
                    <div style={{ width: '60%', height: '200px', border: '1px solid black' }}>
                        Uploaded Image will apperar here
                    </div>
                )}
            </div>

            {/* Input element for image upload */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '10px' }}
            />

            {/* Additional content or actions can be added here */}
        </div>
    );
};

export default ImageUpload;
