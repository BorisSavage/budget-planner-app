import { useAutoAnimate } from "@formkit/auto-animate/react";
import AddBudgetModal from "components/AddBudgetModal";
import AddExpenseModal from "components/AddExpenseModal";
import BudgetCard from "components/BudgetCard";
import Navbar from "components/Navbar";
import TotalBudgetCard from "components/TotalBudgetCard";
import UncategorizedBudgetCard from "components/UncategorizedBudgetCard";
import ViewExpensesModal from "components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "contexts/BudgetContext";
import { useState } from "react";

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
        useState("");
    const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState("");
    const { budgets, getBudgetExpenses } = useBudgets();
    const [parent] = useAutoAnimate({
        duration: 250,
        //easing: "cubic-bezier(.2,.8,.2,1)",
    });

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setaddExpenseModalBudgetId(budgetId);
    }

    return (
        <div className="mx-auto max-w-5xl">
            {" "}
            <div>
                <Navbar
                    setShowAddBudgetModal={() => setShowAddBudgetModal(true)}
                    openAddExpenseModal={() => openAddExpenseModal()}
                />
                <div ref={parent}>
                    <div ref={parent} className="p-3 text-center sm:p-6">
                        {budgets.map((budget, index) => {
                            const amount = getBudgetExpenses(budget.id).reduce(
                                (total, expense) => total + expense.amount,
                                0
                            );
                            const isLast = index === budgets.length - 1;
                            return (
                                <div
                                    key={budget.id}
                                    className={`inline-block w-full py-2 px-2 align-top md:w-1/2 ${
                                        isLast && budgets.length % 2 !== 0
                                            ? "md:block"
                                            : ""
                                    }`}
                                >
                                    <BudgetCard
                                        name={budget.name}
                                        amount={amount}
                                        max={budget.max}
                                        onAddExpenseClick={() =>
                                            openAddExpenseModal(budget.id)
                                        }
                                        onViewExpensesClick={() =>
                                            setViewExpensesModalBudgetId(
                                                budget.id
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div ref={parent} className="p-3 sm:px-6 sm:pt-0">
                        <UncategorizedBudgetCard
                            onAddExpenseClick={() => openAddExpenseModal()}
                            onViewExpensesClick={() =>
                                setViewExpensesModalBudgetId(
                                    UNCATEGORIZED_BUDGET_ID
                                )
                            }
                        />
                        <TotalBudgetCard />
                    </div>
                </div>
            </div>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId("")}
            />
        </div>
    );
}

export default App;
