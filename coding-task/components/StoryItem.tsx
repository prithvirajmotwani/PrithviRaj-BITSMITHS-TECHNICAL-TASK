import { Story } from '../types/story';

interface Props {
  story: Story;
  index: number;
}

export default function StoryItem({ story, index }: Props) {
  return (
    <li className="py-2">
      <div className="flex items-start gap-2">
        <span className="text-gray-600 font-bold w-6 text-right">{index + 1}.</span>
        <div className="flex-1">
          <a href={story.url} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
          <div className="text-xs text-gray-600">
            {story.score} points by {story.by} | {story.descendants ?? 0} comments
          </div>
        </div>
      </div>
    </li>
  );
}