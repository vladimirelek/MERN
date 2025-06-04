import { useState, useEffect } from "react";
import "./Comments.scss";
import { getComments } from "../../services/adminService";
import { updateCommentStatus } from "../../services/adminService";
import { toast } from "react-toastify";
const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments();
      if (res.status === "successful") {
        setComments(res.comments);
      }
    };

    fetchComments();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const res = await updateCommentStatus(id, newStatus);
    if (res.status === "successful") {
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, status: newStatus } : comment
        )
      );
      toast.success(res.message);
    } else toast.warning(res.message);
  };

  return (
    <div className="admin-comments">
      <h2>Lista komentara</h2>
      {comments.length === 0 ? (
        <p className="no-comments">Nema komentara.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-card" key={comment._id}>
            <p>
              <strong>Autor:</strong> {comment.author}
            </p>
            <p>
              <strong>Datum:</strong> {new Date(comment.date).toLocaleString()}
            </p>
            <p>
              <strong>Komentar:</strong> {comment.comment}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <button
                onClick={() => {
                  handleStatusToggle(comment._id, comment.status);
                }}
                className={
                  comment.status ? "status-btn active" : "status-btn inactive"
                }
              >
                {comment.status ? "Aktivan" : "Neaktivan"}
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
