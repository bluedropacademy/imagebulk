import axios from 'axios';
import type { ImageGenerationRequest, ImageGenerationResponse } from '../types';

const API_BASE_URL = 'https://api.kie.ai/api/v1/jobs';

export class KieAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(
    prompt: string,
    aspectRatio: string,
    resolution: string,
    outputFormat: string
  ): Promise<ImageGenerationResponse> {
    try {
      const requestBody: ImageGenerationRequest = {
        model: 'nano-banana-pro',
        input: {
          prompt,
          aspect_ratio: aspectRatio,
          resolution,
          output_format: outputFormat,
        },
      };

      const response = await axios.post<ImageGenerationResponse>(
        `${API_BASE_URL}/createTask`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'שגיאה ביצירת התמונה'
        );
      }
      throw error;
    }
  }

  async checkTaskStatus(taskId: string): Promise<ImageGenerationResponse> {
    try {
      const response = await axios.get<ImageGenerationResponse>(
        `${API_BASE_URL}/${taskId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'שגיאה בבדיקת סטטוס המשימה'
        );
      }
      throw error;
    }
  }

  async waitForCompletion(
    taskId: string,
    maxAttempts: number = 60,
    interval: number = 2000
  ): Promise<ImageGenerationResponse> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.checkTaskStatus(taskId);

      if (status.status === 'completed') {
        return status;
      }

      if (status.status === 'failed') {
        throw new Error(status.error || 'יצירת התמונה נכשלה');
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('פג זמן המתנה ליצירת התמונה');
  }
}
