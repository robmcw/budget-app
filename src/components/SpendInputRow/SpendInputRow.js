import React from "react";
const SpendInputRow = (props) => {

    return (
        < React.Fragment >

            <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                    {props.cat}
                </td>

                <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Input"
                        aria-label="Income"
                        onChange={event => {
                            props.enteredSpendHandler(event.target.value, props.cat)
                        }}
                    >
                    </input>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default SpendInputRow;



