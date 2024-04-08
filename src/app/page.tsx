"use client";
import { useState, useEffect } from "react";
import { listPosts } from "../graphql/queries";
import "../../awsAmplifyConfigure";
import generateClient from "@aws-amplify/api";
const client = generateClient;

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData: any = await client.graphql({
      query: listPosts,
    });
    setPosts(postData.data.listPosts.items);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>My Posts</h1>
        {posts.map((post: any, index: number) => (
          <div key={index}>{post.title}</div>
        ))}
      </div>
    </main>
  );
}
