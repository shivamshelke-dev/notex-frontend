import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";
import toast from "react-hot-toast";


// FETCH NOTES
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/notes");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// CREATE NOTE
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      const { data } = await API.post("/notes", noteData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// DELETE NOTE
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/notes/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// FETCH TRASH
export const fetchTrash = createAsyncThunk(
  "notes/fetchTrash",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/notes/trash");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    trash: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      //create note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.unshift(action.payload);
        toast.success("Note Created Successfully");
      })
      .addCase(createNote.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to create note");
      })
      //delete note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload
        );
        toast.success("Moved to Trash");
      })

      .addCase(fetchTrash.fulfilled, (state, action) => {
        state.trash = action.payload;
      });
  },
});

export default noteSlice.reducer;
