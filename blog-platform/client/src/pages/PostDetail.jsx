import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ token, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(data => {
        setPost(data);
        setLikes(data.likes?.length || 0);
        if (user) setLiked(data.likes?.includes(user._id));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!token) return navigate('/login');
    const res = await fetch(`/api/posts/${id}/like`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setLikes(data.likes);
    setLiked(data.liked);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!token) return navigate('/login');
    if (!comment.trim()) return;
    const res = await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: comment })
    });
    const comments = await res.json();
    setPost(prev => ({ ...prev, comments }));
    setComment('');
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/');
  };

  if (loading) return <div className="loading">⏳ Loading post...</div>;
  if (!post) return <div className="loading">Post not found</div>;

  const isAuthor = user && post.author?._id === user._id;

  return (
    <div className="post-detail">
      <div className="post-detail-title">{post.title}</div>
      <div className="post-detail-meta">
        <span className="post-detail-author">✍️ {post.author?.name}</span>
        <span className="post-detail-date">📅 {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span className="post-detail-date">📖 {post.readTime} min read</span>
        <span className="card-category">{post.category}</span>
      </div>

      <div className="post-detail-content">{post.content}</div>

      <div className="post-actions">
        <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          ❤️ {likes} {liked ? 'Liked' : 'Like'}
        </button>
        {isAuthor && (
          <>
            <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>✏️ Edit</button>
            <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
          </>
        )}
      </div>

      <div className="comments-section">
        <div className="comments-title">💬 Comments ({post.comments?.length || 0})</div>
        {token ? (
          <form className="comment-form" onSubmit={handleComment}>
            <input className="comment-input" placeholder="Write a comment..." value={comment} onChange={e => setComment(e.target.value)} />
            <button type="submit" className="comment-btn">Post</button>
          </form>
        ) : (
          <p style={{ color: '#475569', marginBottom: '16px', fontSize: '14px' }}>
            <span onClick={() => navigate('/login')} style={{ color: '#6366f1', cursor: 'pointer' }}>Login</span> to leave a comment
          </p>
        )}
        {post.comments?.map((c, i) => (
          <div key={i} className="comment-item">
            <div className="comment-name">👤 {c.name}</div>
            <div className="comment-text">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
