import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservationSticky = () => {
  const [searchValues, setSearchValues] = useState({
    available: "",
    pax: "",
    date: "",
  });
  const navigate = useNavigate();

  const clickedSearch = () => {
    navigate(
      `/searched/${searchValues.available}/${searchValues.date}/${searchValues.pax}`
    );
  };

  const disabledDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return (
      yyyy +
      "-" +
      mm.toString().padStart(2, 0) +
      "-" +
      dd.toString().padStart(2, 0)
    );
  };

  return (
    <form
      className="flex z-index-30 mt-15 sticky top-15 border-gray-700 bg-glasss flex-row w-full <md:( text-[13px]  flex flex-col h-20)"
      onSubmit={clickedSearch}
    >
      <div className="pt-2 <md:(flex  items-center)">
        <span className="border-t w-50  h-[80%] border-b border-white font-serif text-white text-center ml-20 items-center justify-center  flex <md:( w-full ml-0)">
          RESERVATION
        </span>
      </div>
      <table className="mb-5 ml-20 <md:(flex flex-col justify-between items-center ml-0)">
        <tr className="item-center text-left w-full <md:(w-full justify-between items-center mt-3 pl-3)">
          <th className="font-thin text-white <md:(w-30 text-start)">
            Availability Date
          </th>
          <th className="font-thin text-white <md:(w-15 text-start)">Rooms</th>
          <th className="font-thin text-white <md:()">Pax</th>
        </tr>
        <tr className="w-full items-center <md:(flex w-full mt-1 pl-3) ">
          <td className="ml-5 <md:(ml-0)">
            <input
              type="date"
              className="border border-black "
              required
              min={disabledDates()}
              onChange={(e) =>
                setSearchValues({ ...searchValues, date: e.target.value })
              }
            />
          </td>
          <td className=" ">
            <input
              type="number"
              className="border border-black w-30 <md:(w-15)"
              required
              onChange={(e) =>
                setSearchValues({
                  ...searchValues,
                  available: e.target.value,
                })
              }
            />
          </td>
          <td className="<md:(flex) ">
            <input
              type="number"
              className="border border-black w-15"
              required
              onChange={(e) =>
                setSearchValues({
                  ...searchValues,
                  pax: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className="hidden border cursor-pointer w-30 font-serif rounded-md h-10 items-center justify-center  bg-red-900 border-black <md:(flex ml-2 h-5 w-20 self-end text-[12px])"
            >
              Search
            </button>
          </td>
        </tr>
      </table>
      <div className="flex items-center justify-center  <md:(hidden)">
        <button
          type="submit"
          className="border ml-5 cursor-pointer w-30 font-serif rounded-md h-10 items-center justify-center  bg-red-900 border-black <md:(h-5 w-20 self-end text-[12px])"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ReservationSticky;
