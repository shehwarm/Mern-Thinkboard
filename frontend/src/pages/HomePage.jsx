import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center py-10 text-primary">Loading...</div>}

         {notes.length === 0 && !isRateLimited && <NoteNotFound />}

          {notes.length >0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {notes.map((note) => (
               <NoteCard key={note._id} note={note} setNotes={setNotes} />
             
            ))}
        </div>
      )}
    </div>
  </div>
);``
};

export default HomePage;