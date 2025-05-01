'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StoryItem from '@/components/StoryItem';
import { fetchTopStoryIds, fetchStory } from '@/utils/api';
import { Story } from '@/types/story';
import Link from 'next/link';

const STORIES_PER_PAGE = 30;

export default function Page() {
  const params = useParams();
  const currentPage = parseInt(params.page as string) || 1;
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const loadStories = async () => {
      const ids = await fetchTopStoryIds();
      const start = (currentPage - 1) * STORIES_PER_PAGE;
      const end = start + STORIES_PER_PAGE;
      const storyData = await Promise.all(ids.slice(start, end).map(fetchStory));
      setStories(storyData);
    };

    loadStories();
  }, [currentPage]);

  return (
    <>
      <ol className="list-none">
        {stories.map((story, i) => (
          <StoryItem key={story.id} story={story} index={(currentPage - 1) * STORIES_PER_PAGE + i} />
        ))}
      </ol>
      <div className="mt-6 flex justify-between text-sm text-blue-600">
        {currentPage > 1 ? (
          <Link href={`/${currentPage - 1}`} className="underline">
            ← Prev
          </Link>
        ) : <span />}
        <Link href={`/${currentPage + 1}`} className="underline">
          Next →
        </Link>
      </div>
    </>
  );
}
