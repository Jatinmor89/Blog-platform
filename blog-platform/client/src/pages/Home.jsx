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
          <button className="hero-btn" onClick={() => navigate('/register')}>St