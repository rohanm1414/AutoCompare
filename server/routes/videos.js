const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/videos?q=Toyota+Camry+2024+review
router.get('/', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    // Return mock videos if no API key
    return res.json({
      items: [
        {
          id: { videoId: 'dQw4w9WgXcQ' },
          snippet: {
            title: `${q} - Review`,
            description: 'Car review video',
            channelTitle: 'AutoCompare Reviews',
            publishedAt: new Date().toISOString(),
            thumbnails: {
              medium: { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=320&h=180&fit=crop' },
            },
          },
        },
        {
          id: { videoId: 'dQw4w9WgXcQ' },
          snippet: {
            title: `${q} - Test Drive`,
            description: 'Test drive video',
            channelTitle: 'Car Reviews Channel',
            publishedAt: new Date().toISOString(),
            thumbnails: {
              medium: { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=320&h=180&fit=crop' },
            },
          },
        },
      ],
    });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${q} review`,
        type: 'video',
        maxResults: 6,
        key: apiKey,
        relevanceLanguage: 'en',
        videoDuration: 'medium',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message });
  }
});

module.exports = router;
