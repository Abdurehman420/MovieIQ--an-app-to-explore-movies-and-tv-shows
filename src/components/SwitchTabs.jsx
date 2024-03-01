import { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 250);
    onTabChange(tab, index);
  };

  return (
    <div className=" h-8 bg-white rounded-md p-[2px]">
      <div className="tabItems flex items-center h-7 relative">
        {data.map((tab, index) => (
          <span
            key={index}
            onClick={() => activeTab(tab, index)}
            className={`tabItem h-full flex items-center justify-center z-10 w-[100px] text-black  text-sm cursor-pointer duration-200   ${
              selectedTab === index ? "active" : ""
            }`}
          >
            {tab}
          </span>
        ))}
        <span
          className=" h-7 w-[100px] rounded-[4px] bg-lightBlue absolute left-0 duration-200 ease-out "
          style={{ left }}
        ></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
