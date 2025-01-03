import IPost from "../../interfaces/Post";
import { getPosts, getPostById, savePost } from "../../services/post.service";

jest.mock('../../config/db.config', () => ({
  requestConfig: jest.fn((method: string, data?: IPost) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  })),
  URL: 'http://mocked-api-url/',
}));

describe('Post Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should fetch posts successfully', async () => {
      const mockPosts: IPost[] = [
        { id: '1', title: 'Post 1', description: 'Description 1', imageURL: 'url1' },
        { id: '2', title: 'Post 2', description: 'Description 2', imageURL: 'url2' },
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPosts),
        })
      ) as jest.Mock;

      const result = await getPosts();
      expect(fetch).toHaveBeenCalledWith('http://mocked-api-url/', expect.any(Object));
      expect(result).toEqual(mockPosts);
    });

    it('should throw an error if the response is not ok', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        })
      ) as jest.Mock;

      await expect(getPosts()).rejects.toThrow('Erro: 500: Internal Server Error');
    });
  });

  describe('getPostById', () => {
    it('should fetch a post by ID successfully', async () => {
      const mockPost: IPost = {
        id: '1',
        title: 'Post 1',
        description: 'Description 1',
        imageURL: 'url1',
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPost),
        })
      ) as jest.Mock;

      const result = await getPostById('1');
      expect(fetch).toHaveBeenCalledWith('http://mocked-api-url/1', expect.any(Object));
      expect(result).toEqual(mockPost);
    });

    it('should throw an error if the post is not found', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        })
      ) as jest.Mock;

      await expect(getPostById('99')).rejects.toThrow('Erro 404: Post Not Found');
    });
  });

  describe('savePost', () => {
    it('should save a post successfully', async () => {
      const newPost: IPost = {
        id: '3',
        title: 'New Post',
        description: 'New Description',
        imageURL: 'new-url',
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 201,
          statusText: 'Created',
          json: () => Promise.resolve(newPost)
        })
      ) as jest.Mock;

      const result = await savePost(newPost);
      expect(fetch).toHaveBeenCalledWith('http://mocked-api-url/', expect.any(Object));
      expect(result).toBeUndefined();
    });

    it('should throw an error if the post cannot be saved', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 500,
          statusText: 'Internal Server Error',
        })
      ) as jest.Mock;

      const newPost: IPost = {
        id: '4',
        title: 'Failed Post',
        description: 'Failure',
        imageURL: 'failure-url',
      };

      await expect(savePost(newPost)).rejects.toThrow('Erro 500: Internal Server Error');
    });
  });
});
