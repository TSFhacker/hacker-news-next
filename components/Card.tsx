"use client";
import React, { useEffect } from "react";
import "./Card.scss";

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
  let storiesPerRow: number;

  if (window.innerWidth > 1503) storiesPerRow = 4;
  else if (window.innerWidth > 1152) storiesPerRow = 3;
  else if (window.innerWidth > 800) storiesPerRow = 2;
  else storiesPerRow = 1;

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
