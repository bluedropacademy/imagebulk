import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">תמונות שנוצרו ({images.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {image.status === 'completed' && image.url ? (
              <>
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm text-gray-600 truncate" title={image.prompt}>
                    {image.prompt}
                  </p>
                  <a
                    href={image.url}
                    download={`image-${image.id}.png`}
                    className="mt-2 inline-block text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ⬇️ הורד תמונה
                  </a>
                </div>
              </>
            ) : image.status === 'failed' ? (
              <div className="p-4 bg-red-50">
                <p className="text-sm text-red-600">❌ שגיאה: {image.error || 'יצירת התמונה נכשלה'}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{image.prompt}</p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 h-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">
                    {image.status === 'pending' ? 'ממתין...' : 'יוצר תמונה...'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
