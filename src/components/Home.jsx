import React, { useEffect, useRef } from 'react';
import FeaturedWork from "./FeaturedWork";
import Header from "./Header";

const Home = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        // Scroll to the header when the page loads
        headerRef.current?.scrollIntoView({ behavior: 'auto' });
    }, []);
    return (
        <>
            <div ref={headerRef}>
                <Header />
            </div>
            <FeaturedWork />
        </>
    )
}

export default Home;