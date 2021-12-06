import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { v4 as uuidv4 } from 'uuid'

// css
import './Project.css'

const Projectcomments = ({ project }) => {

  const [newComment, setNewComment] = useState('')

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentBody = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuidv4()
    }

    console.log(commentBody)
  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea 
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </label>

        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}

export default Projectcomments;
