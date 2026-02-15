import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteNote, fetchNotes } from "../redux/noteSlice";
import { FormatDate } from "../FormatDate/DateFormat";
import { useNavigate } from "react-router-dom";

const AllNote = () => {
  const { notes } = useSelector((state) => state.notes); // ✅ corrected
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);


  // Fetch notes when component loads
  useEffect(() => {
    if (token) {
      dispatch(fetchNotes());
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-10 max-w-[1200px] mx-auto px-5">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded border mt-6">
          <input
            type="search"
            placeholder="Search notes here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Notes */}
        <div className="flex flex-col border py-4 rounded">
          <h2 className="px-4 text-4xl font-bold border-b pb-4">
            Saved Notes
          </h2>

          <div className="w-full px-4 pt-4 flex flex-col gap-y-5 min-h-[300px]">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="border w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded"
                >
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-2xl font-semibold">
                      {note.title}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        className="p-2 border rounded hover:border-blue-500"
                        onClick={() =>
                          navigate(`/?noteId=${note._id}`)
                        }
                      >
                        <PencilLine size={20} />
                      </button>

                      <button
                        className="p-2 border rounded hover:border-red-500"
                        onClick={() => handleDelete(note._id)}
                      >
                        <Trash2 size={20} />
                      </button>

                      <button
                        className="p-2 border rounded hover:border-orange-500"
                        onClick={() =>
                          navigate(`/notes/${note._id}`)
                        }
                      >
                        <Eye size={20} />
                      </button>

                      <button
                        className="p-2 border rounded hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(note.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy size={20} />
                      </button>
                    </div>

                    <div className="flex gap-x-2 items-center">
                      <Calendar size={18} />
                      {FormatDate(note.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full">
                No Notes Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNote;
