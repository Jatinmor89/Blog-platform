import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CATEGORIES = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Finance', 'Education', 'General'];

function EditPost({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(data => setForm({ title: data.title, content: data.content, category: data.category }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="create-page">
      <div className="create-title">✏️ Edit Post</div>
      {error && <div className="form-error" style={{ marginBottom: '16px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-textarea" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        </div>
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : '💾 Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
