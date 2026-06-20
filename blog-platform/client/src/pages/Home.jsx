import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CATEGORIES = ['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Finance', 'Education', 'General'];
const EMOJIS = { Technology: '💻', Travel: '✈️', Food: '🍕', Lifestyle: '🌿', Health: '💪', Finance: '💰', Education: '📚', General: '📝' };

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [category, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ category, page });
      if (search) params.append('search', search);
      const res = await fetch(`${API}/api/posts?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  return (
    <div>
      {!user && (
        <div className="hero">
          <h1>Share Your Story with the World</h1>
          <p>Join thousands of writers and readers on BlogVerse</p>
          <button className="hero-btn" onClick={() => navigate('/register')}>Start Writing Today →</button>
        </div>
      )}

      <div className="container">
        <form className="search-filter" onSubmit={handleSearch}>
          <input
            className="search-box"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="cat-btn active">Search</button>
        </form>

        <div className="search-filter" style={{ marginBottom: '28px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => { setCategory(cat); setPage(1); }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">⏳ Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="empty"><p>📭</p><p>No posts found</p></div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post._id} className="post-card" onClick={() => navigate(`/post/${post._id}`)}>
                <div className="card-cover">{EMOJIS[post.category] || '📝'}</div>
                <div className="card-body">
                  <div className="card-meta">
                    <span className="card-category">{post.category}</span>
                    <span className="card-read">📖 {post.readTime} min read</span>
                  </div>
                  <div className="card-title">{post.title}</div>
                  <div className="card-excerpt">{post.excerpt}</div>
                  <div className="card-footer">
                    <div className="card-author">By <span>{post.author?.name}</span></div>
                    <div className="card-likes">❤️ {post.likes?.length || 0}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
            <span style={{ color: '#475569' }}>Page {page} of {totalPages}</span>
            <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
