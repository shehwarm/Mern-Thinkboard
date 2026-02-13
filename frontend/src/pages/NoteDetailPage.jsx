
import { ArrowLeftIcon, Loader2 as LoaderIcon, Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate,useParams,Link } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";


const NoteDetailPage = () =>{
    const [note,setNote] = useState(null);
    const[loading,setLoading] = useState(true);
    const [saving,setSaving] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try{
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            navigate("/");
        }catch(error){
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note. Please try again later.");
        }
    };

    const handleSave = async () => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("Please fill in both title and content.");
            return;
        }
        setSaving(true);
        try{
            await api.put(`/notes/${id}`, note);
            toast.success("Note saved successfully");
        }catch(error){
            console.error("Error saving note:", error);
            toast.error("Failed to save note. Please try again later.");
        }finally{
            setSaving(false);
        }
    };


     
    useEffect(() => {
        const fetchNote = async () => {
            try{
                const response = await api.get(`/notes/${id}`);
                setNote(response.data);
            }catch(error){
                console.error("Error fetching note:", error);
                toast.error("Failed to load note. Please try again later.");
            }finally{
                setLoading(false);
            }   
        };

        fetchNote();
    } , [id]);

    if(loading){
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10"/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h-5 w-5 mr-2"/>
                    Back to Notes
                </Link>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                    <Trash2Icon className="h-5 w-5"/>
                    Delete Note
                </button>
                </div>
                <div className ="card bg-base-100">
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" className="input input-bordered" value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-40" value={note.content} onChange={(e) => setNote({...note, content: e.target.value})}></textarea>
                        </div>
                <div className="card-actions justify-end">

                <button onClick={handleSave} className={`btn btn-primary ${saving ? "loading" : ""}`}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

              
    );
};

export default NoteDetailPage;
