import React from "react";

const MonthSpendCard = (props) => {

    const name = Object.keys(props.spending.category).map((catKey) => {
        return <div
            className="block px-8 py-4"
            key={props.id + catKey} >
            <div
                className="text-sm leading-5 text-gray-900 font-semibold"
            >
                {catKey}
            </div>
        </div>
    });

    const spent = Object.keys(props.spending.category).map((catKey) => {
        return <div
            className="block px-8 py-4"
            key={props.id + catKey} >

            <div
                className="text-sm leading-5 text-gray-900 font-semibold">
                {props.spending.category[catKey]}
            </div>
        </div>
    });

    const budget = Object.keys(props.budget).map((cat) => {
        console.log(cat)
        console.log(props.budget[cat].monthly)
        return <div
            className="block px-8 py-4"
            key={props.id + cat} >

            <div
                className="text-sm leading-5 text-gray-900 font-semibold">
                {props.budget[cat].monthly}
            </div>
        </div>
    });

    return (
        <React.Fragment >
            <div className="mx-8 my-4 px-8 py-4 border-gray-300 border rounded shadow">
                <table
                    className="min-w-full max-w-full"
                >

                    <thead >
                        <tr className="bg-white px-8 flex h-20 ">
                            <td className="font-bold text-2m block my-auto">{props.month}</td>
                        </tr>
                        <tr>
                            <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Category
                      </th>
                            <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Spent
                      </th>
                            <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Budget
                      </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                            <td className="capitalize w-1/2 whitespace-no-wrap border-b border-gray-200">
                                {name}
                            </td>

                            <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                                {spent}
                            </td>
                            <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                                {budget}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default MonthSpendCard;