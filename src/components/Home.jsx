import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../redux/noteSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content required");
      return;
    }

    dispatch(createNote({ title, content, tags: [] }));
    toast.success("Note created successfully");

    setTitle("");
    setContent("");
  };

  return (
    <div className="w-full py-10 max-w-[1200px] mx-auto px-6" >
      
      {/* Top Section */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium"
        >
          Create Note
        </button>
      </div>

      {/* Editor Box */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        
        {/* Mac Style Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(content);
              toast.success("Copied to clipboard");
            }}
          >
            <Copy size={18} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Write Your Content Here...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[500px] p-5 resize-none focus:outline-none text-gray-700"
        />
      </div>
    </div>
  );
};

export default Home;
