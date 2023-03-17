import { useAutoAnimate } from "@formkit/auto-animate/react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "contexts/BudgetContext";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { currencyFormatter } from "../utils";
import Backdrop from "./Backdrop";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const [parent] = useAutoAnimate({
        duration: 125,
        //easing: "cubic-bezier(.2,.8,.2,1)",
    });

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
        useBudgets();

    const budgetExpenses = getBudgetExpenses(budgetId);

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((budget) => budget.id === budgetId);

    return (
        <>
            <Backdrop
                show={budgetId ? true : false}
                handleClose={handleClose}
            />
            <div
                className={
                    "fixed inset-x-3.5 top-3.5 mx-auto max-w-lg transition duration-500 ease-savage-sig-2 lg:inset-x-0 lg:top-[33.3%] lg:left-[50%] lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:duration-[250ms] " +
                    " " +
                    (budgetId
                        ? "opacity-100 max-lg:translate-y-0"
                        : "pointer-events-none opacity-0 max-lg:-translate-y-full")
                }
            >
                <div className="rounded-lg bg-gradient-to-b from-amber-50 via-white to-indigo-50 p-2 shadow-lg sm:p-5">
                    <div className="m-2 grid grid-cols-1 gap-3">
                        <div className="flex items-baseline justify-between transition-none">
                            <div>
                                <h1 className="mb-2 text-xl font-bold">
                                    Expenses
                                    {budget?.name && " - " + budget.name}
                                </h1>
                                {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                    <button
                                        onClick={() => {
                                            deleteBudget(budget);
                                            handleClose();
                                        }}
                                        className="rounded-lg border border-red-300 px-3 text-neutral-600 transition duration-[700ms] ease-savage-sig-2 hover:border-red-600 hover:text-red-600 hover:shadow-lg"
                                    >
                                        Delete Budget
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleClose}
                                type="button"
                                className="rounded-lg bg-neutral-100/50 px-3 font-medium text-black ring-2 ring-amber-100 transition duration-[500ms] ease-savage-sig-2 hover:ring hover:ring-amber-200 hover:drop-shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                        <div ref={parent} className="my-2">
                            {budgetExpenses.map((expense) => {
                                return (
                                    <div
                                        className="flex items-center justify-between gap-2 border-b border-neutral-400 px-1 py-1.5 font-bold"
                                        key={expense.id}
                                    >
                                        <h2 className="">
                                            {expense.description}
                                        </h2>
                                        <div className="flex items-center justify-center gap-1">
                                            <div>
                                                {currencyFormatter.format(
                                                    expense.amount
                                                )}
                                            </div>
                                            <button
                                                className="rounded-md text-xl font-bold text-neutral-600 transition duration-[700ms] ease-savage-sig-2 hover:text-red-600"
                                                onClick={() =>
                                                    deleteExpense(expense)
                                                }
                                            >
                                                <IoClose />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ViewExpensesModal.propTypes = {
    budgetId: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
};

export default ViewExpensesModal;
