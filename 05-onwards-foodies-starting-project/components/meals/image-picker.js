'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {

    const [pickedImage, setPickedImage] = useState();

    const imageInput = useRef();

    // Função para lidar com a escolha da imagem
    function handlePickImage() {
        imageInput.current.click();
    }


    // Função para lidar com a mudança de imagem
    function handelImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);

    }

    return (
        <div className={classes.picker}>

            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage &&
                        <Image
                            src={pickedImage}
                            alt="The image selected by the user"
                            fill
                        />
                    }
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    ref={imageInput}
                    onChange={handelImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickImage}>Pick an Image</button>
            </div>
        </div>
    );
}