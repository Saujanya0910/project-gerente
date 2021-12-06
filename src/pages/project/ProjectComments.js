import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { v4 as uuidv4 } from 'uuid'
import { formatDistanceToNow } from 'date-fns'

// css
import './Project.css'
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/Avatar';

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

      {/* render all existing comments */}
      <ul>
        { project.comments.length > 0 && project.comments.map(c => (
          <li key={c.id}>
            <div className="comment-author">
              <Avatar src={c.photoURL} />
              <p>{ c.displayName }</p>
            </div>

            <div className="comment-date">
              <p>{ formatDistanceToNow(c.createdAt.toDate(), { addSuffix: true }) }</p>
            </div>

            <div className="comment-content">
              <p>{ c.content }</p>
            </div>
          </li>
        )) }
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea 
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </label>

        {/* errors */}
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
