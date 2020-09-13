import React from "react";
import TableRow from "../../components/TableRow/TableRow";

const Dashboard = () => {

    const budgets = {
        category: {
            rent: {
                name: "Rent",
                percentage: "30%",
                monthly: "£600",
                category: "Essential"
            },
            groceries: {
                name: "Groceries",
                percentage: "8%",
                monthly: "£120",
                category: "Essential"
            },
            transport: {
                name: "Transport",
                percentage: "4%",
                monthly: "90",
                category: "Essential"
            },
            entertainment: {
                name: "Entertainment",
                percentage: "12%",
                monthly: "£250",
                category: "Luxury"
            }
        },
    };

    console.log(budgets.category.groceries)

    const tableRows = Object.keys(budgets.category).map((catKey) => {
        console.log(budgets.category[catKey])
        return <TableRow key={catKey} budget={budgets.category[catKey]} />;
    });


    return (
        <>
            <div className="bg-white px-8 flex h-20 border-b border-gray-300">
                <h2 className="font-bold text-2xl block my-auto">Budget planner</h2>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="align-middle inline-block min-w-full bg-gray-100 border-b border-gray-200">
                        <table className="min-w-full max-w-full">
                            <thead>
                                <tr>
                                    <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                      </th>
                                    <th className="px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Percentage
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Monthly
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                      </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">{tableRows}</tbody>
                        </table>
                    </div>
                    {/* {loading && <Loading />}
              {!loading && !projectRows[0] && (
                <div className="text-gray-500 p-4 text-center">
                  No projects created
                </div>
              )} */}
                </div>
            </div>
        </>
    );
};

export default Dashboard;