import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CATEGORIES = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Finance', 'Education', 'General'];

function CreatePost({ token }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate(`/post/${data._id}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="auth-box" style={{ maxWidth: '700px' }}>
        <div className="auth-title">Write a New Post ✍️</div>
        <div className="auth-sub">Share your story with the BlogVerse community</div>
        {error && <div className="form-error" style={{ marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" type="text" placeholder="Enter a catchy title"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea className="form-input" rows={10} placeholder="Write your post here..."
              value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          </div>
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;