import useLocalStorage from "hooks/useLocalStorage";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext(null);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext);
}

const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter((expense) => expense.budgetId === budgetId);
    }

    function addExpense({ description, budgetId, amount }) {
        setExpenses((prevExpenses) => {
            return [
                ...prevExpenses,
                { id: uuidV4(), description, budgetId, amount },
            ];
        });
    }

    function addBudget({ name, max }) {
        setBudgets((prevBudgets) => {
            if (prevBudgets.find((budget) => budget.name === name))
                return prevBudgets;
            return [...prevBudgets, { id: uuidV4(), name, max }];
        });
    }
    function deleteBudget({ id }) {
        setExpenses((previousExpenses) => {
            return previousExpenses.map((expense) => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
            });
        });
        setBudgets((previousBudgets) => {
            return previousBudgets.filter((budget) => budget.id !== id);
        });
    }
    function deleteExpense({ id }) {
        setExpenses((previousExpenses) => {
            return previousExpenses.filter((expense) => expense.id !== id);
        });
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    );
};

BudgetsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BudgetsProvider;
