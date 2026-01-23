import React, { useRef, useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';

interface PhotoUploadProps {
    photo: string | null;
    onPhotoChange: (photo: string | null) => void;
    size?: 'sm' | 'md' | 'lg';
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
    photo,
    onPhotoChange,
    size = 'md',
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
    };

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Max file size: 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            // Create an image to resize if needed
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 400; // Max dimension for storage efficiency

                let { width, height } = img;

                // Only resize if larger than maxSize
                if (width > maxSize || height > maxSize) {
                    if (width > height) {
                        height = (height / width) * maxSize;
                        width = maxSize;
                    } else {
                        width = (width / height) * maxSize;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // Convert to base64 with reasonable quality
                const resizedPhoto = canvas.toDataURL('image/jpeg', 0.85);
                onPhotoChange(resizedPhoto);
            };
            img.src = result;
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleRemovePhoto = () => {
        onPhotoChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="photo-upload-container">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="photo-upload-input"
            />

            {photo ? (
                <div className={`photo-preview ${sizeClasses[size]}`}>
                    <img
                        src={photo}
                        alt="Profile"
                        className="photo-preview-image"
                    />
                    <button
                        onClick={handleRemovePhoto}
                        className="photo-remove-btn"
                        type="button"
                        title="Remove photo"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="photo-change-btn"
                        type="button"
                        title="Change photo"
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`photo-upload-placeholder ${sizeClasses[size]} ${isDragging ? 'photo-upload-placeholder--dragging' : ''}`}
                >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="photo-upload-text">Upload Photo</span>
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;
