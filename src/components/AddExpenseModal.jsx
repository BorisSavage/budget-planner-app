import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "contexts/BudgetContext";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Backdrop from "./Backdrop";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
    const descriptionRef = useRef(null);
    const amountRef = useRef(null);
    const { addExpense, budgets } = useBudgets();

    const getSelectedOption = (budgets, defaultBudgetId) => {
        const defaultBudget = budgets.find(
            (budget) => budget.id === defaultBudgetId
        );
        return {
            value: defaultBudgetId || UNCATEGORIZED_BUDGET_ID,
            label: defaultBudget?.name || "Uncategorized",
        };
    };

    const [selectedBudgetOption, setSelectedBudgetOption] = useState(
        getSelectedOption(budgets, defaultBudgetId)
    );

    useEffect(() => {
        setSelectedBudgetOption(getSelectedOption(budgets, defaultBudgetId));
    }, [defaultBudgetId, budgets]);

    const handleSelectChange = (selectedOption) => {
        setSelectedBudgetOption(selectedOption);
    };

    const options = [
        {
            value: UNCATEGORIZED_BUDGET_ID,
            label: "Uncategorized",
        },
        ...budgets.map((budget) => ({
            value: budget.id,
            label: budget.name,
        })),
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: selectedBudgetOption.value,
        });
        handleClose();
        descriptionRef.current.value = "";
        amountRef.current.value = null;
    };

    const handleCloseAndResetSelect = () => {
        handleClose();
        // setSelectedBudgetOption({
        //     value: UNCATEGORIZED_BUDGET_ID,
        //     label: "Uncategorized",
        // });
    };

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#a5b4fc" : "#d1d5db",
            boxShadow: `0 0 0 ${state.isFocused ? "2px #4f46e5" : "0"}`,
            "&:hover": {
                borderColor: state.isFocused ? "#818cf8" : "#9ca3af",
            },
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "#4f46e5" : "#ffffff",
            "&:hover": {
                backgroundColor: state.isSelected ? "#6366f1" : "#fef3c7",
            },
            fontWeight: 500,
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            fontWeight: 700,
        }),
    };

    return (
        <>
            <Backdrop show={show} handleClose={handleCloseAndResetSelect} />
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
                        className="m-2 grid grid-cols-1"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex items-baseline justify-between">
                            <h1 className="mb-2 text-xl font-bold">
                                New Expense
                            </h1>
                            <button
                                onClick={handleCloseAndResetSelect}
                                type="button"
                                className="rounded-lg bg-neutral-100/50 px-3 font-medium text-black ring-2 ring-amber-100 transition duration-[500ms] ease-savage-sig-2 hover:ring hover:ring-amber-200 hover:drop-shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                        <fieldset className="flex flex-col px-2.5 py-1.5 font-semibold">
                            <label className="mb-1" htmlFor="description">
                                Description
                            </label>
                            <input
                                ref={descriptionRef}
                                style={{ outline: "none" }}
                                className="h-[38px] rounded-md border border-neutral-300 py-2 px-2.5 font-bold leading-5 shadow-sm transition duration-150 ease-in-out hover:border-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                                id="description"
                                type="text"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col px-2.5 py-1.5 font-semibold">
                            <label className="mb-1" htmlFor="amount">
                                Amount
                            </label>
                            <input
                                ref={amountRef}
                                style={{ outline: "none" }}
                                className="h-[38px] rounded-md border border-neutral-300 py-2 px-2.5 font-bold leading-5 shadow-sm transition duration-150 ease-in-out hover:border-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                                id="amount"
                                type="number"
                                required
                                min={0}
                                step={0.01}
                            />
                        </fieldset>
                        <fieldset className="flex flex-col px-2.5 pb-1.5 pt-2.5 font-semibold">
                            <label className="mb-1" htmlFor="budgetid">
                                Budget
                            </label>
                            <Select
                                options={options}
                                styles={customStyles}
                                value={selectedBudgetOption}
                                onChange={handleSelectChange}
                                className="rounded-md border font-normal"
                                id="budgetid"
                                required
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

AddExpenseModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    defaultBudgetId: PropTypes.string,
};

export default AddExpenseModal;
