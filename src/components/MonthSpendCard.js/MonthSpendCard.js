import React from "react";

const MonthSpendCard = (props) => {

    const name = Object.keys(props.spending).map((catKey) => {
        return <div
            className="block px-8 py-4" >
            <div
                className="text-sm leading-5 text-gray-900 font-semibold">
                {props.spending[catKey].name}
            </div>
        </div>
    });

    const spent = Object.keys(props.spending).map((catKey) => {
        return <div
            className="block px-8 py-4">
            <div
                className="text-sm leading-5 text-gray-900 font-semibold">
                {props.spending[catKey].spent}
            </div>
        </div>
    });

    return (
        <React.Fragment key={props.month}>
            <table className="min-w-full max-w-full">

                <thead>
                    <tr className="bg-white px-8 flex h-20 border-b border-gray-300">
                        <td className="font-bold text-2m block my-auto">{props.month}</td>
                    </tr>
                    <tr>
                        <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Category
                      </th>
                        <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Spent
                      </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                        <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                            {name}
                        </td>

                        <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                            {spent}
                        </td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default MonthSpendCard;