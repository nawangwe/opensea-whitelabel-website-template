import * as React from 'react';
import Image from 'next/image'
import { useStyletron } from 'baseui';

const HeaderImage = () => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={
                css({
                    position: "relative",
                    height: "200px",
                })
            }
        >
            <Image
                layout="fill"
                objectFit="cover"
                src="/images/header.jpg"
                alt="header" />
        </div>)
};

export default HeaderImage