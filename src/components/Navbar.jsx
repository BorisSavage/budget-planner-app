import PropTypes from "prop-types";

const Navbar = ({ setShowAddBudgetModal, openAddExpenseModal }) => {
    return (
        <div className="mx-auto flex flex-row items-center justify-between p-4 sm:mt-4">
            <div>
                <h1 className="mr-3 text-4xl font-bold text-indigo-900 drop-shadow-lg sm:text-5xl">
                    Budget<span className="text-amber-500">Z</span>
                </h1>
            </div>
            <div className="flex justify-end">
                <button
                    className="mx-1 rounded-2xl border border-lime-400 bg-indigo-700 py-2 px-3 font-bold text-white transition duration-[700ms] ease-savage-sig-2 hover:bg-white hover:text-lime-500 hover:shadow-lg"
                    onClick={setShowAddBudgetModal}
                >
                    Add Budget
                </button>
                <button
                    className="mx-1 rounded-2xl border border-amber-500 py-2 px-3 font-medium text-indigo-900 transition duration-[700ms] ease-savage-sig-2 hover:text-lime-500 hover:shadow-lg"
                    onClick={openAddExpenseModal}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    setShowAddBudgetModal: PropTypes.func.isRequired,
    openAddExpenseModal: PropTypes.func.isRequired,
};

export default Navbar;
