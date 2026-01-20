import { useState } from 'react';
import JSZip from 'jszip';
import { KieAIService } from './services/api';
import ProgressBar from './components/ProgressBar';
import ImageGallery from './components/ImageGallery';
import type { GeneratedImage, AspectRatio, Resolution, OutputFormat } from './types';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [prompts, setPrompts] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [resolution, setResolution] = useState<Resolution>('1K');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalPrompts, setTotalPrompts] = useState(0);

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      alert('נא להזין API Key');
      return;
    }

    if (!prompts.trim()) {
      alert('נא להזין לפחות prompt אחד');
      return;
    }

    const promptList = prompts
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (promptList.length === 0) {
      alert('נא להזין לפחות prompt אחד');
      return;
    }

    setIsGenerating(true);
    setImages([]);
    setCurrentProgress(0);
    setTotalPrompts(promptList.length);

    const service = new KieAIService(apiKey);
    const generatedImages: GeneratedImage[] = [];

    for (let i = 0; i < promptList.length; i++) {
      const prompt = promptList[i];
      const imageId = `img-${Date.now()}-${i}`;

      // הוספת תמונה בסטטוס pending
      const newImage: GeneratedImage = {
        id: imageId,
        prompt,
        url: '',
        status: 'pending',
      };
      generatedImages.push(newImage);
      setImages([...generatedImages]);

      try {
        // עדכון סטטוס ל-processing
        generatedImages[i].status = 'processing';
        setImages([...generatedImages]);

        // יצירת התמונה
        const task = await service.generateImage(
          prompt,
          aspectRatio,
          resolution,
          outputFormat
        );

        // המתנה לסיום
        const result = await service.waitForCompletion(task.id);

        if (result.status === 'completed' && result.result?.images?.[0]) {
          generatedImages[i].url = result.result.images[0];
          generatedImages[i].status = 'completed';
        } else {
          throw new Error('לא התקבלה תמונה');
        }
      } catch (error) {
        generatedImages[i].status = 'failed';
        generatedImages[i].error = error instanceof Error ? error.message : 'שגיאה לא ידועה';
      }

      setImages([...generatedImages]);
      setCurrentProgress(i + 1);
    }

    setIsGenerating(false);
  };

  const handleDownloadAll = async () => {
    const completedImages = images.filter(img => img.status === 'completed' && img.url);

    if (completedImages.length === 0) {
      alert('אין תמונות להורדה');
      return;
    }

    try {
      const zip = new JSZip();

      // הורדת כל התמונות והוספתן ל-ZIP
      for (let i = 0; i < completedImages.length; i++) {
        const image = completedImages[i];
        const response = await fetch(image.url);
        const blob = await response.blob();
        const extension = outputFormat;
        zip.file(`image-${i + 1}-${image.id}.${extension}`, blob);
      }

      // יצירת קובץ ZIP והורדה
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `images-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('שגיאה בהורדת התמונות:', error);
      alert('שגיאה בהורדת התמונות');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            🎨 יצירת תמונות בכמות
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Powered by Nano Banana Pro (Gemini 3.0)
          </p>

          {/* API Key Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key של kie.ai
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="הזן את ה-API Key שלך"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>

          {/* Prompts Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompts (שורה לכל תמונה)
            </label>
            <textarea
              value={prompts}
              onChange={(e) => setPrompts(e.target.value)}
              placeholder="הזן prompt לכל תמונה (שורה חדשה לכל תמונה)&#10;לדוגמה:&#10;A beautiful sunset over the ocean&#10;A cat playing with a ball&#10;A futuristic city at night"
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              disabled={isGenerating}
            />
            <p className="text-sm text-gray-500 mt-1">
              {prompts.split('\n').filter(p => p.trim()).length} prompts
            </p>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                יחס גובה-רוחב
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              >
                <option value="1:1">1:1 (ריבוע)</option>
                <option value="16:9">16:9 (רחב)</option>
                <option value="9:16">9:16 (אנכי)</option>
                <option value="4:3">4:3</option>
                <option value="3:4">3:4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                רזולוציה
              </label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value as Resolution)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              >
                <option value="1K">1K ($0.09)</option>
                <option value="2K">2K ($0.09)</option>
                <option value="4K">4K ($0.12)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                פורמט פלט
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`flex-1 py-4 px-6 rounded-lg font-medium text-white transition-all ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isGenerating ? '⏳ מייצר תמונות...' : '🚀 צור תמונות'}
            </button>

            <button
              onClick={handleDownloadAll}
              disabled={isGenerating || images.filter(img => img.status === 'completed').length === 0}
              className={`py-4 px-6 rounded-lg font-medium transition-all ${
                isGenerating || images.filter(img => img.status === 'completed').length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
              }`}
            >
              ⬇️ הורד הכל כ-ZIP
            </button>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <ProgressBar
              current={currentProgress}
              total={totalPrompts}
              label="מתקדם..."
            />
          )}

          {/* Image Gallery */}
          <ImageGallery images={images} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>נבנה באמצעות React + TypeScript + Vite</p>
          <p className="mt-1">API: Nano Banana Pro by kie.ai</p>
        </div>
      </div>
    </div>
  );
}

export default App;
