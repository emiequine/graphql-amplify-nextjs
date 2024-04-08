"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../../awsAmplifyConfigure";
import { Auth, Hub } from "aws-amplify";

const NavBar = () => {
  const [signedUser, setSignedUser] = useState(false);
  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);
        case "signOut":
          return setSignedUser(false);
      }
    });
    try {
      const authenticationResponse = await Auth.currentAuthenticatedUser();
      console.log(authenticationResponse);
      setSignedUser(true);
    } catch (err: any) {
      console.log(err.message);
    }
  }
  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
      {[
        ["Home", "/"],
        ["Create Post", "/create-post"],
        ["Profile", "/profile"],
      ].map(([title, url], index) => (
        <Link href={url} key={index}>
          {title}
        </Link>
      ))}

      {signedUser && <Link href="/my-posts">My Posts</Link>}
    </nav>
  );
};

export default NavBar;
