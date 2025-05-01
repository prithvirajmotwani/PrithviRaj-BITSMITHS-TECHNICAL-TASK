const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStoryIds = async (): Promise<number[]> => {
  const res = await fetch(`${BASE_URL}/topstories.json`);
  return res.json();
};

export const fetchStory = async (id: number) => {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  return res.json();
};