import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './llm.service';
import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LlmService', () => {
  let service: LlmService;

  beforeEach(async () => {
    // Mock environment variables BEFORE creating the module
    process.env.LLM_API_KEY = 'test-api-key';
    process.env.LLM_MODEL = 'gemini-2.5-flash';
    process.env.LLM_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmService],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clean up environment variables
    delete process.env.LLM_API_KEY;
    delete process.env.LLM_MODEL;
    delete process.env.LLM_API_URL;
  });

  describe('getExpertReply', () => {
    it('should return a League of Legends response for valid question', async () => {

      const mockResponse = {
        data: {
          candidates: [{
            content: {
              parts: [{
                text: 'Jinx is a chaotic ADC champion from Zaun who uses explosive weapons and has a sister rivalry with Vi.'
              }]
            }
          }]
        }
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getExpertReply('Who is Jinx in League of Legends?');

      // Assert
      expect(result).toBe('Jinx is a chaotic ADC champion from Zaun who uses explosive weapons and has a sister rivalry with Vi.');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=test-api-key',
        expect.objectContaining({
          contents: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              parts: expect.arrayContaining([
                expect.objectContaining({
                  text: expect.stringContaining('Who is Jinx in League of Legends?')
                })
              ])
            })
          ])
        })
      );
    });

    it('should reject off-topic questions politely', async () => {
      // Arrange
      const mockResponse = {
        data: {
          candidates: [{
            content: {
              parts: [{
                text: 'I can only help with League of Legends questions. Please ask me something about LoL champions, items, or gameplay!'
              }]
            }
          }]
        }
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getExpertReply('How do you cook pasta?');

      // Assert
      expect(result).toContain('League of Legends');
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when API fails', async () => {
      // Arrange
      mockedAxios.post.mockRejectedValue(new Error('API Error'));

      // Act & Assert
      await expect(service.getExpertReply('Who is Jinx?'))
        .rejects
        .toThrow(InternalServerErrorException);
    });

    it('should handle empty response from Gemini', async () => {
      // Arrange
      const mockResponse = {
        data: {
          candidates: []
        }
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getExpertReply('Who is Jinx?');

      // Assert
      expect(result).toBe('No reply');
    });
  });
});
