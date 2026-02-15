import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTrash } from "../redux/noteSlice";

const Trash = () => {
  const dispatch = useDispatch();
  const { trash } = useSelector((state) => state.notes);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchTrash());
    }
  }, [dispatch, token]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Recently Deleted</h1>

      {trash.length > 0 ? (
        trash.map((note) => (
          <div key={note._id} className="border p-4 mb-4">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      ) : (
        <p>No deleted notes</p>
      )}
    </div>
  );
};

export default Trash;
