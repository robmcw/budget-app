import React, { useState, useEffect, useRef } from "react";
import PlannerRow from "../../components/PlannerRow/PlannerRow";


const Planner = () => {

    const inputRef = useRef();
    const [enteredIncome, setEnteredIncome] = useState(null);
    const [monthlyRent, SetMonthlyRent] = useState(0);
    const [annualRent, SetAnnualRent] = useState(0);
    const [monthlyGroceries, SetMonthlyGroceries] = useState(0);
    const [annualGroceries, SetAnnualGroceries] = useState(0);
    const [monthlyTransport, SetMonthlyTransport] = useState(0);
    const [annualTransport, SetAnnualTransport] = useState(0);
    const [monthlyEntertainment, SetMonthlyEntertainment] = useState(0);
    const [annualEntertainment, SetAnnualEntertainment] = useState(0);

    const budgets = {
        category: {
            rent: {
                name: "Rent",
                percentage: 30,
                monthly: monthlyRent,
                annual: annualRent,
                category: "Essential"
            },
            groceries: {
                name: "Groceries",
                percentage: 8,
                monthly: monthlyGroceries,
                annual: annualGroceries,
                category: "Essential"
            },
            transport: {
                name: "Transport",
                percentage: 4,
                monthly: monthlyTransport,
                annual: annualTransport,
                category: "Essential"
            },
            entertainment: {
                name: "Entertainment",
                percentage: 12,
                monthly: monthlyEntertainment,
                annual: annualEntertainment,
                category: "Luxury"
            }
        },
    };

    const tableRows = Object.keys(budgets.category).map((catKey) => {
        return <PlannerRow key={catKey} budget={budgets.category[catKey]} />;
    });

    const incomeHandler = (income, budgets) => {
        Object.keys(budgets.category).map((catKey) => {
            const newAnnual = Math.round((income / 100 * budgets.category[catKey].percentage));
            const newMonthly = Math.round(newAnnual / 12);
            switch (budgets.category[catKey].name) {
                case 'Rent':
                    SetMonthlyRent(newMonthly)
                    SetAnnualRent(newAnnual)
                    break;

                case 'Groceries':
                    SetMonthlyGroceries(newMonthly)
                    SetAnnualGroceries(newAnnual)
                    break;

                case 'Transport':
                    SetMonthlyTransport(newMonthly)
                    SetAnnualTransport(newAnnual)
                    break;

                case 'Entertainment':
                    SetMonthlyEntertainment(newMonthly)
                    SetAnnualEntertainment(newAnnual)
                    break;

                default:
                    return (console.log('Error'))
            }
        })
    };

    useEffect(() => {
        console.log("USE EFFECT")
        setTimeout(() => {
            if (enteredIncome !== null || inputRef.current.value) {
                incomeHandler(parseInt(inputRef.current ? inputRef.current.value : 0), budgets)
            };
        }, 500);
    }, [enteredIncome, budgets]);


    console.log("RENDERING JSX")
    return (
        <>
            <div className="bg-white px-8 flex h-20 border-b border-gray-300">
                <h2 className="font-bold text-2xl block my-auto">Budget planner</h2>
            </div>

            <form className="w-full max-w-sm" >
                <div className="flex items-center border-b border-teal-500 py-2">

                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="£25,000"
                        aria-label="Income"
                        ref={inputRef}
                        onChange={event => {
                            setEnteredIncome(event.target.value)
                        }}
                    >
                    </input>
                </div>
            </form>

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
                                        Annually
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                      </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">{tableRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Planner;