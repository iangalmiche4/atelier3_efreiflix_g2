import React from "react";
import "./styles/comments.css";

const Comments = ({ id }) => {
  const comments = [
    {
      id: 1,
      user: "User_2024",
      date: "2024-03-20",
      content: "Ce film est un chef-d'œuvre du genre. La performance des acteurs est exceptionnelle !",
      likes: 5,
    },
    {
      id: 2,
      user: "SeriesLover",
      date: "2024-03-19",
      content: "Une réalisation impeccable. Le scénario est prenant du début à la fin.",
      likes: 182,
    },
    {
      id: 3,
      user: "CinemaFan",
      date: "2024-03-15",
      content: "Les effets spéciaux sont impressionnants, mais l'histoire manque un peu de profondeur.",
      likes: 89,
    }
  ];

  return (
    <div className="netflix-comments">
      <h3>Commentaires pour "{id}"</h3>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="username">{comment.user}</span>
              <span className="date">{comment.date}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-actions">
              <span className="likes">👍 {comment.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
