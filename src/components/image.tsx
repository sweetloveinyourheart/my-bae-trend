import { FC } from "react";

interface ImageInterface {
    url: string;
    translateX: number;
    translateY: number;
}

const Image: FC<{ image: ImageInterface, imgIndex: number }> = ({ image, imgIndex }) => {
    return (
        <div
            className={`image-container image--pos-${imgIndex + 1}`}
            style={{
                transform: `translate(${image.translateX}px, ${image.translateY}px)`
            }}
        >
            <div
                className="image"
                style={{ backgroundImage: `url(${image.url})` }}
            >
            </div>
        </div>
    )
}

export default Image