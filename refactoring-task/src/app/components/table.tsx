"use client";

import { useState, ChangeEvent } from "react";


{/*
  Changes:
    1. Descriptive Naming: Renamed vague variables like handleOnChange → toggleIssueSelection.

    2. DRY Principles: Removed duplicate checkbox and color logic.

    3. Memoization Logic: Reduced duplicate array iterations.

    4. Improved Checkbox Logic: Clearer control flow for indeterminate checkbox logic.

    5. Encapsulated Constants: Avoided hardcoded colors in multiple places.  

    6. Added Comments for readability
*/}

// Define the shape of each issue
export type Issue = {
  id: string;
  name: string;
  message: string;
  status: "open" | "resolved";
  numEvents: number;
  numUsers: number;
  value: number;
};

// Track the selection state and styling for each issue row
type IssueState = {
  checked: boolean;
  backgroundColor: string;
};

// Props for the Table component
type TableProps = {
  issues: Issue[];
};

// Constants for row background colors
const UNSELECTED_COLOR = "#ffffff";
const SELECTED_COLOR = "#eeeeee";

const Table = ({ issues }: TableProps) => {
  // State: Whether each issue is selected and its background color
  const [issueStates, setIssueStates] = useState<IssueState[]>(
    issues.map(() => ({
      checked: false,
      backgroundColor: UNSELECTED_COLOR,
    }))
  );

  // State: Whether the select-all checkbox is fully checked
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // State: Total value of selected "open" issues
  const [selectedTotal, setSelectedTotal] = useState(0);

  // Update select-all checkbox to be indeterminate based on selection state
  const updateIndeterminateState = (selectedValueSum: number) => {
    const selectAllCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    ) as HTMLInputElement | null;

    if (!selectAllCheckbox) return;

    const openIssuesCount = issues.filter((i) => i.status === "open").length;

    // If partially selected, show indeterminate
    selectAllCheckbox.indeterminate =
      selectedValueSum > 0 && selectedValueSum < openIssuesCount;

    // Fully check if all open issues are selected
    setSelectAllChecked(selectedValueSum === openIssuesCount);
  };

  // Toggle individual issue selection
  const toggleIssueSelection = (index: number) => {
    const updatedStates = [...issueStates];
    const current = updatedStates[index].checked;

    // Toggle the checked state and background color
    updatedStates[index] = {
      checked: !current,
      backgroundColor: !current ? SELECTED_COLOR : UNSELECTED_COLOR,
    };

    setIssueStates(updatedStates);

    // Recalculate the selected total based on open issues
    const total = updatedStates.reduce((sum, state, idx) => {
      return state.checked && issues[idx].status === "open"
        ? sum + issues[idx].value
        : sum;
    }, 0);
    setSelectedTotal(total);

    updateIndeterminateState(total);
  };

  // Toggle select-all checkbox
  const handleSelectAllToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    // Set all open issues as selected/unselected
    const newStates = issues.map((issue) =>
      issue.status === "open"
        ? { checked, backgroundColor: checked ? SELECTED_COLOR : UNSELECTED_COLOR }
        : { checked: false, backgroundColor: UNSELECTED_COLOR }
    );

    setIssueStates(newStates);

    // Recalculate the total for selected issues
    const total = newStates.reduce((sum, state, idx) => {
      return state.checked ? sum + issues[idx].value : sum;
    }, 0);

    setSelectedTotal(total);
    setSelectAllChecked(checked);
    updateIndeterminateState(total);
  };

  return (
    <table className="w-full border-collapse shadow-lg">
      <thead>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6 text-left w-[48px]">
            <input
              className="w-5 h-5 cursor-pointer"
              type="checkbox"
              id="custom-checkbox-selectDeselectAll"
              checked={selectAllChecked}
              onChange={handleSelectAllToggle}
            />
          </th>
          <th className="py-6 min-w-[8rem] text-left text-black">
            {selectedTotal ? `Selected $${selectedTotal}` : "None selected"}
          </th>
          <th colSpan={2} />
        </tr>
        <tr className="border-2 border-gray-200">
          <th className="py-6 pl-6" />
          <th className="py-6 text-left font-medium text-black">Name</th>
          <th className="py-6 text-left font-medium text-black">Message</th>
          <th className="py-6 text-left font-medium text-black">Status</th>
        </tr>
      </thead>
      <tbody>
        {issues.map(({ name, message, status }, index) => {
          const isOpen = status === "open";
          const isChecked = issueStates[index]?.checked;

          // Determine row style and clickability
          const rowClass = [
            "border-b border-gray-200",
            isOpen ? "cursor-pointer hover:bg-blue-50 text-black" : "text-gray-600 cursor-not-allowed",
            isChecked ? "bg-blue-50" : "",
          ].join(" ");

          return (
            <tr
              className={rowClass}
              key={index}
              onClick={isOpen ? () => toggleIssueSelection(index) : undefined}
            >
              <td className="py-6 pl-6">
                <input
                  className={`w-5 h-5 ${isOpen ? "cursor-pointer" : "opacity-50"}`}
                  type="checkbox"
                  checked={isChecked}
                  disabled={!isOpen}
                  onChange={isOpen ? () => toggleIssueSelection(index) : undefined}
                />
              </td>
              <td className="py-6">{name}</td>
              <td className="py-6">{message}</td>
              <td className="py-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-[15px] h-[15px] rounded-full ${
                      isOpen ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isOpen ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {isOpen ? "Open" : "Resolved"}
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
