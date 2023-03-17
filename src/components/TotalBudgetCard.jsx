import { useBudgets } from "contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const max = budgets.reduce((total, budget) => total + budget.max, 0);

    if (max === 0) return null;

    return (
        <div className="inline-block h-[124px] w-full py-2 px-2 align-top md:w-1/2">
            <BudgetCard
                gray
                name="Total"
                amount={amount}
                max={max}
                hideButtons
            />
        </div>
    );
}
