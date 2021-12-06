import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { v4 as uuidv4 } from 'uuid'

// css
import './Project.css'
import { useFirestore } from '../../hooks/useFirestore';

const Projectcomments = ({ project }) => {

  const { updateDocument, response } = useFirestore('projects')

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

    await updateDocument(project.id, {
      // add cmnt body to existing array
      comments: [...project.comments, commentBody]
    })

    if(!response.error) {
      setNewComment('')
    }
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

        { response.error &&
          <div className="error">{ response.error }</div>
        }

        { !response.isPending && 
          <button className="btn">Add Comment</button>
        }
        
        { response.isPending && 
          <button className="btn" disabled>Processing...</button>
        }
        
      </form>
    </div>
  );
}

export default Projectcomments;
