import { Play } from 'lucide-react';

export default function VideoCard({ video }) {
  const { videoId } = video.id;
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const thumb = thumbnails?.medium?.url;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group hover:shadow-md transition-shadow duration-200 block"
    >
      <div className="relative overflow-hidden">
        <img
          src={thumb}
          alt={title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=320&h=180&fit=crop';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-red-600 text-white rounded-full p-3">
            <Play size={20} fill="white" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{channelTitle}</p>
        <p className="text-xs text-gray-400 mt-0.5">{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </a>
  );
}
