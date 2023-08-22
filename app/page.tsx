import StoryList from "@/components/StoryList";

type Props = {};

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const NUMBERS_PER_PAGE = 20;

export default async function Page() {
  const result: Response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );

  const idList: number[] = await result.json();

  const storyList: Story[] = [];
  for (const id of idList.slice(0, NUMBERS_PER_PAGE)) {
    const result2: Response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    const story: Story = await result2.json();
    storyList.push(story);
  }

  return <StoryList initialStories={storyList} idList={idList} />;
}
