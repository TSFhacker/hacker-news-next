"use client";
import React, { useEffect, useState } from "react";
import "./StoryList.scss";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "./Card";
import { InfiniteScroll } from "./InfiniteScroll";

type Props = {
  initialStories: Story[];
  idList: number[];
};

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

export default function StoryList({ initialStories, idList }: Props) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [stories, setStories] = useState<Story[]>(initialStories);
  const hasMoreData = stories.length < 100;

  const loadMoreNumbers = async () => {
    if (!stories.length || stories.length === 100) return;

    setPage((page) => page + 1);
    setLoading(true);
    const storyList: Story[] = [];
    for (const id of idList.slice(
      page * NUMBERS_PER_PAGE,
      page * NUMBERS_PER_PAGE + NUMBERS_PER_PAGE
    )) {
      const result2: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      const story: Story = await result2.json();
      storyList.push(story);
    }
    setStories([...stories, ...storyList]);
    setLoading(false);
  };
  return (
    <div className="main-container">
      <h1 className="main-title">Top 100 Hacker News</h1>
      <InfiniteScroll
        hasMoreData={hasMoreData}
        isLoading={loading}
        onBottomHit={loadMoreNumbers}
        loadOnMount={true}
      >
        <div className="story-containers">
          {stories.map((story, i) => {
            return <Card story={story} i={i} />;
          })}
        </div>
      </InfiniteScroll>

      {stories.length ? (
        <div className="loader--2">
          <ClipLoader loading={loading}></ClipLoader>
        </div>
      ) : (
        <ClipLoader className="loader"></ClipLoader>
      )}
    </div>
  );
}
