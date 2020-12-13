import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Image = memo((props) => {
    const imageRef = useRef(null);
    const {src, alt, dataSrc, className} = props;
    const imageObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0.0) {
                    const img = entry.target;
                    if (!img.hasAttribute('src')) {
                        img.setAttribute('src', img.dataset.src);
                    }
                }
            });
        },
        {}
    );
    useEffect(()=>{
        imageObserver.observe(imageRef.current);
    });
    return (
        <img alt={alt} className={className} data-src={dataSrc} ref={imageRef}/>
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    dataSrc: PropTypes.string,
    className: PropTypes.string
};

export default Image;