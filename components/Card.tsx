"use client";
import React, { useEffect, useState } from "react";
import "./Card.scss";
import { ClipLoader } from "react-spinners";

type Props = { story: Story; i: number };

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

export default function Card({ story, i }: Props) {
  const [storiesPerRow, setStoriesPerRow] = useState<number>();

  useEffect(() => {
    if (window.innerWidth > 1503) setStoriesPerRow(4);
    else if (window.innerWidth > 1152) setStoriesPerRow(3);
    else if (window.innerWidth > 800) setStoriesPerRow(2);
    else setStoriesPerRow(1);
  }, []);

  if (!storiesPerRow) return <ClipLoader className="loader"></ClipLoader>;
  return (
    <div className={`card-container card-container--${i % storiesPerRow}`}>
      <a className="story" href={story.url} target="blank">
        <h2 className="story-title">{story.title}</h2>
        <div className="author">
          by <span className="author-name">{story.by}</span>
        </div>
        <div className="score">Score: {story.score}</div>
      </a>
    </div>
  );
}
