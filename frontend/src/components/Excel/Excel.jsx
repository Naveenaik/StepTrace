import { useState } from "react";
import axios from "axios";
import Navbar from "../dashboard/Navbar";

const Excel = () => {
  const [personName, setPersonName] = useState("");
  const [personData, setPersonData] = useState([]);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [numRows, setNumRows] = useState("");

  // Fetch data for a specific person
  const fetchPersonData = async () => {
    if (!personName) {
      alert("Please enter a person's name.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/get-person-data?person_name=${personName}`
      );
      setPersonData(response.data);
    } catch (error) {
      alert(error.response?.data?.error || "Error fetching person data.");
    }
  };

  // Delete selected rows
  const deleteRows = async () => {
    try {
      const response = await axios.post("http://localhost:5000/delete-rows", {
        person_name: personName,
        rows_to_delete: rowsToDelete,
      });
      alert(response.data.message);
      fetchPersonData(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting rows.");
    }
  };

  // Maintain uniform number of rows
  const maintainUniformRows = async () => {
    if (!numRows) {
      alert("Please enter the number of rows.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/maintain-uniform-rows",
        {
          num_rows: parseInt(numRows),
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Error maintaining uniform rows.");
    }
  };

  return (
    <div>
      <Navbar showBack={false}/>

      <div>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
          <h1 className="text-3xl font-bold mb-6">Excel CRUD Operations</h1>

          {/* Search Person */}
          <div className="mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Enter person name"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={fetchPersonData}
              className="mt-4 w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Display Person Data */}
          {personData.length > 0 && (
            <div className="w-full max-w-[190vh] bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th>Sl No.</th>
                      {Object.keys(personData[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left border">
                          {key}
                        </th>
                      ))}
                      <th className="px-4 py-2 border">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personData.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td>{index + 1}</td>
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-4 py-2 border">
                            {value}
                          </td>
                        ))}
                        <td className="px-4 py-2 border">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRowsToDelete([...rowsToDelete, index]);
                              } else {
                                setRowsToDelete(
                                  rowsToDelete.filter((row) => row !== index)
                                );
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={deleteRows}
                className="mt-4 w-full px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Selected Rows
              </button>
            </div>
          )}

          {/* Maintain Uniform Rows */}
          <div className="mt-8 w-full max-w-md">
            <input
              type="number"
              placeholder="Enter uniform row count"
              value={numRows}
              onChange={(e) => setNumRows(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={maintainUniformRows}
              className="mt-4 w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Maintain Uniform Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Excel;
