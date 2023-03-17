import PropTypes from "prop-types";
import { currencyFormatter } from "../utils";

const BudgetCard = ({
    name,
    amount,
    max,
    gray,
    onAddExpenseClick,
    onViewExpensesClick,
    hideButtons,
}) => {
    const percent = amount > max ? 100 : (amount * 100) / max;
    const classNames = [];
    if (amount > max) classNames.push("bg-red-100", "border-red-300");
    else if (gray) {
        classNames.push("bg-gray-100");
    }
    //px-6 py-2 sm:px-8
    return (
        <>
            <div
                className={
                    "h-full rounded-lg border p-2 transition duration-[200ms] ease-out hover:scale-105 hover:shadow-lg" +
                    " " +
                    classNames.join(" ")
                }
            >
                <div className="mb-3 flex items-baseline justify-between font-medium">
                    <div className="mr-2 text-xl">{name}</div>
                    <div className="flex items-baseline text-xl">
                        {currencyFormatter.format(amount)}&nbsp;
                        {max && (
                            <span className="text-sm text-neutral-500">
                                / {currencyFormatter.format(max)}
                            </span>
                        )}
                    </div>
                </div>
                {max && (
                    <div className="flex h-6 w-full items-center overflow-hidden rounded-full border border-amber-100 bg-indigo-200">
                        <div
                            className={
                                "relative h-6 w-full border transition duration-[3000ms] ease-savage-sig-2" +
                                " " +
                                getVariantClasses(percent)
                            }
                            style={{
                                transform: `translateX(-${100 - percent}%)`,
                            }}
                        ></div>
                    </div>
                )}
                {!hideButtons && (
                    <div className="mt-4 flex justify-center">
                        <button
                            className="mx-2 rounded-2xl border border-amber-500 py-2 px-3 font-medium  text-indigo-900 transition duration-[700ms] ease-savage-sig-2 hover:text-lime-500"
                            onClick={onAddExpenseClick}
                        >
                            Add Expense
                        </button>
                        <button
                            className="mx-2 rounded-2xl border border-neutral-300 py-2 px-3 text-neutral-600 transition duration-[700ms] ease-savage-sig-2 hover:bg-neutral-100/50 hover:text-black"
                            onClick={onViewExpensesClick}
                        >
                            View Expenses
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const getVariantClasses = (percent) => {
    const okay = "border-lime-600 bg-lime-500";
    const warning = "border-amber-600 bg-amber-500";
    const danger = "border-red-600 bg-red-500";

    if (percent < 80) return okay;
    if (percent < 100) return warning;
    return danger;
};

BudgetCard.propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    max: PropTypes.number,
    gray: PropTypes.bool,
    onAddExpenseClick: PropTypes.func,
    onViewExpensesClick: PropTypes.func,
    hideButtons: PropTypes.bool,
};

export default BudgetCard;
