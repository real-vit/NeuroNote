import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const generateRGBColor = (index) => {
  const colors = ["red", "green", "blue"];
  return colors[index % colors.length];
};

const SearchPage = () => {
  const [tagColors, setTagColors] = useState({});

  useEffect(() => {
    const colors = {};
    [
      "Team Notes", "Shared", "Collaboration", "Project Ideas", "Class Notes", 
      "Task Assignment", "Brainstorming", "Research", "Collaborators", "Work-in-Progress"
    ].forEach((tag, index) => {
      colors[tag] = generateRGBColor(index);
    });
    setTagColors(colors);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow flex flex-col items-center p-6 mt-20 w-full">
        <div className="w-full max-w-lg flex items-center bg-white rounded-full shadow-md p-3">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>

        <div className="mt-6 w-full max-w-2xl bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-3 justify-center">
          {[
            "Team Notes", "Shared", "Collaboration", "Project Ideas", "Class Notes", 
            "Task Assignment", "Brainstorming", "Research", "Collaborators", "Work-in-Progress"
          ].map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full"
              style={{
                backgroundColor: tag === "Button Tag" ? "black" : tagColors[tag], 
                color: tag === "Button Tag" ? "white" : "white", 
              }}
            >
              {tag === "Button Tag" ? "Button Tag" : tag}
            </span>
          ))}
        </div>

        <div className="mt-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            { 
              name: "DSA Learning Notes", 
              collaborators: ["Alice", "Bob"], 
              tags: ["Algorithms", "Job"], 
              lastEdited: "2 days ago", 
              description: "Summary of important DSA topics and questions"
            },
            { 
              name: "Class Notes", 
              collaborators: ["Frank"], 
              tags: ["Journal", "Reflection"], 
              lastEdited: "3 days ago", 
              description: "Reflections and goals for personal growth and productivity."
            },
            { 
              name: "Research Paper Summary", 
              collaborators: ["Kim", "Leo"], 
              tags: ["Research", "Notes"], 
              lastEdited: "2 weeks ago", 
              description: "Summary and key takeaways from recent research papers."
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between h-70 mt-3 cursor-pointer transform hover:scale-105 transition-all"
              onClick={() => alert(`You clicked on: ${item.name}`)} 
            >
              <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.collaborators.length} Collaborators</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="bg-black text-white px-2 py-1 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <p className="text-xs text-gray-500 text-right mt-2">
                Last edited by {item.collaborators.join(", ")} - {item.lastEdited}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;





