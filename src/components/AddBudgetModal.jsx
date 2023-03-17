import { useBudgets } from "contexts/BudgetContext";
import PropTypes from "prop-types";
import { useRef } from "react";
import Backdrop from "./Backdrop";

const AddBudgetModal = ({ show, handleClose }) => {
    const nameRef = useRef(null);
    const maxRef = useRef(null);
    const { addBudget } = useBudgets();

    function handleSubmit(event) {
        event.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        });
        handleClose();
        nameRef.current.value = "";
        maxRef.current.value = null;
    }

    return (
        <>
            <Backdrop show={show} handleClose={handleClose} />
            <div
                className={
                    "fixed inset-x-3.5 top-3.5 mx-auto max-w-lg transition duration-500 ease-savage-sig-2 lg:inset-x-0 lg:top-[33.3%] lg:left-[50%] lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:duration-[250ms] " +
                    " " +
                    (show
                        ? "opacity-100 max-lg:translate-y-0"
                        : "pointer-events-none opacity-0 max-lg:-translate-y-full")
                }
            >
                <div className="rounded-lg bg-gradient-to-b from-amber-50 via-white to-indigo-50 p-2 shadow-lg sm:p-5">
                    <form
                        className="m-2 grid grid-cols-1 gap-3"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex items-baseline justify-between">
                            <h1 className="mb-2 text-xl font-bold">
                                New Budget
                            </h1>
                            <button
                                onClick={handleClose}
                                type="button"
                                className="rounded-lg bg-neutral-100/50 px-3 font-medium text-black ring-2 ring-amber-100 transition duration-[500ms] ease-savage-sig-2 hover:ring hover:ring-amber-200 hover:drop-shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                        <fieldset className="flex flex-col px-2.5 py-1.5 font-semibold">
                            <label className="mb-1.5" htmlFor="name">
                                Name
                            </label>
                            <input
                                ref={nameRef}
                                style={{ outline: "none" }}
                                className="h-[38px] rounded-md border border-neutral-300 py-2 px-2.5 font-bold leading-5 shadow-sm transition duration-150 ease-in-out hover:border-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                                id="name"
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col px-2.5 py-1.5 font-semibold">
                            <label className="mb-1.5" htmlFor="max">
                                Maximum Spending
                            </label>
                            <input
                                ref={maxRef}
                                style={{ outline: "none" }}
                                className="h-[38px] rounded-md border border-neutral-300 py-2 px-2.5 font-bold leading-5 shadow-sm transition duration-150 ease-in-out hover:border-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                                id="max"
                                type="number"
                                required
                                min={0}
                                step={0.01}
                            />
                        </fieldset>
                        <div className="flex justify-end">
                            <button
                                className="mt-3.5 rounded-lg bg-neutral-100/50 py-2 px-3 font-medium text-black ring-2 ring-indigo-300 transition duration-[500ms] ease-savage-sig-2 hover:bg-lime-400 hover:ring hover:ring-indigo-600 hover:drop-shadow-lg"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

AddBudgetModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddBudgetModal;
