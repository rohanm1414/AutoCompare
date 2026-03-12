const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/videos?q=Toyota+Camry+2024+review
router.get('/', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    // Return mock videos — use YouTube's actual thumbnail URL format for realism
    // Real videos about popular car reviews
    const mockVideos = [
      { videoId: 'ZFNKiCe91To', title: `${q} - Full Review`, channel: 'Edmunds' },
      { videoId: 'pqHUqQ4iyJo', title: `${q} - Test Drive & Walk Around`, channel: 'MotorTrend' },
      { videoId: 'f4P-IhF6dh4', title: `${q} - First Drive Impressions`, channel: 'Car and Driver' },
      { videoId: 'Z7HNp2KKBR4', title: `${q} - Should You Buy One?`, channel: 'Doug DeMuro' },
      { videoId: 'gVri0nq0pIU', title: `${q} - In-Depth Walk Around`, channel: 'TFLcar' },
      { videoId: 'sYRiIL2OBHQ', title: `${q} - Ownership Review`, channel: 'AutoCompare Reviews' },
    ];
    return res.json({
      items: mockVideos.map(({ videoId, title, channel }) => ({
        id: { videoId },
        snippet: {
          title,
          description: `Watch our comprehensive review of the ${q}`,
          channelTitle: channel,
          publishedAt: new Date().toISOString(),
          thumbnails: {
            medium: { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` },
          },
        },
      })),
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
