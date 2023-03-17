import PropTypes from "prop-types";

export default function Backdrop({ show, handleClose }) {
    return (
        <div
            className={
                "fixed top-0 left-0 h-[130%] w-full bg-neutral-700 bg-opacity-50 transition duration-500 ease-savage-sig-2 " +
                (show ? "opacity-100" : "pointer-events-none opacity-0")
            }
            onClick={handleClose}
        ></div>
    );
}

Backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
