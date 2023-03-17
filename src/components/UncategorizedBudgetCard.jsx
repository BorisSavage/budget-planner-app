import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    );

    if (amount === 0) return null;

    return (
        <div className="inline-block w-full py-2 px-2 align-top md:w-1/2">
            <BudgetCard gray name="Uncategorized" amount={amount} {...props} />
        </div>
    );
}
