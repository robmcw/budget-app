import React from "react";
const SpendInputRow = (props) => {
    if (props.spending === "loading") {
        return (
            <tr className="animate-pulse">
                <td className="  w-full whitespace-no-wrap flex h-6 w-1/2 rounded-sm bg-white-200">
                </td>
                <td className="  w-1/4 whitespace-no-wrap flex h-4  rounded-sm bg-blue-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-6  rounded-sm bg-white-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-4  rounded-sm bg-blue-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-6  rounded-sm bg-white-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-4  rounded-sm bg-blue-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-6  rounded-sm bg-white-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-4  rounded-sm bg-blue-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-6 rounded-sm bg-white-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-4  rounded-sm bg-blue-200">
                </td>
                <td className="  w-full whitespace-no-wrap flex h-6 rounded-sm bg-white-200">
                </td>
            </tr>



        );
    }

    return (
        < React.Fragment >

            <tr className=" h-12 hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer text-sm leading-5 text-gray-900 font-semibold" >
                <td className=" capitalize w-1/2 whitespace-no-wrap">
                    {props.cat}
                </td>

                <td className="w-1/2 whitespace-no-wrap border-gray-200 ">
                    <input className="text-center text-sm leading-5 text-gray-900 font-semibold appearance-none bg-transparent w-full mr-3 py-1 px-2 leading-tight focus:outline-none "
                        type="text"
                        placeholder="0"
                        aria-label="spending"
                        onChange={event => {
                            props.enteredSpendHandler(event.target.value, props.cat)
                        }}
                    >
                    </input>
                </td>
            </tr>
        </React.Fragment >
    );
}

export default SpendInputRow;



