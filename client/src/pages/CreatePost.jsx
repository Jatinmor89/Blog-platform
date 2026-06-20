import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Finance', 'Education', 'General'];

function CreatePost({ token }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'General', coverImage: '' });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, tags })
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
    <div className="create-page">
      <div className="create-title">✍️ Write a New Post</div>
      {error && <div className="form-error" style={{ marginBottom: '16px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" placeholder="Enter an engaging title..."
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Tags (press Enter to add)</label>
          <div className="tags-input">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}<button type="button" onClick={() => removeTag(tag)}>×</button></span>
            ))}
            <input className="tag-input-field" placeholder="Add tag..." value={tagInput}
              onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-textarea" placeholder="Write your story here..."
            value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        </div>
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? 'Publishing...' : '🚀 Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
