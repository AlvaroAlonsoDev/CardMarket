import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export function Carrusel() {

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://wallpapercrafter.com/desktop/146151-Magic-The-Gathering-artwork-video-game-art-Liliana-Vess.png"
                    alt="First slide"
                    height="450px"
                />
            <Carousel.Caption>
                <h3>Magic The Gathering</h3>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}