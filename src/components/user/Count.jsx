import { useState, useEffect } from "react";

const Count = ({ limit, header, img, speed }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 600 && count < limit) {
                const intervalId = setInterval(() => {
                    setCount(prevCount => {
                        if (prevCount + speed >= limit) {
                            clearInterval(intervalId);
                            return limit;
                        }
                        return prevCount + speed;
                    });
                }, 300);
    
                return () => clearInterval(intervalId);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [speed, count, limit]);
    

    return (
        <div className='counter'>
            <div className='counter-title'>
                <h3 className='counter-header'>{header}</h3>
                <img src={img} height={70} alt={header} />
            </div>
            <h1 className='counter-count'>{count}+</h1>
        </div>
    );
};

export default Count;
