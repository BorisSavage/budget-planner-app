import PropTypes from "prop-types";
import { useState } from "react";

export default function Backdrop({ show, handleClose }) {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    function handleViewportChange() {
        setViewportHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleViewportChange);

    return (
        <div
            className={
                "fixed top-0 left-0 h-full w-full bg-neutral-700 bg-opacity-50 transition duration-500 ease-savage-sig-2 " +
                (show ? "opacity-100" : "pointer-events-none opacity-0")
            }
            onClick={handleClose}
            style={{ height: viewportHeight }}
        ></div>
    );
}

Backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
