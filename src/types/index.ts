export interface ImageGenerationRequest {
  model: string;
  callBackUrl?: string;
  input: {
    prompt: string;
    aspect_ratio: string;
    resolution: string;
    output_format: string;
  };
}

export interface ImageGenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    images: string[];
  };
  error?: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
export type Resolution = '1K' | '2K' | '4K';
export type OutputFormat = 'png' | 'jpg';
