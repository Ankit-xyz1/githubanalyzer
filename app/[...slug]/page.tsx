"use client";
import { useParams } from "next/navigation";
import { log } from "node:console";
import React, { useEffect } from "react";

const UserPage = () => {
  const params = useParams(); // Gets dynamic params from the URL
  const xyz:number = 10
  useEffect(() => {
    console.log(params);
    
  }, [])

  return (
    <div>
      <h1>User Info</h1>
    </div>
  );
};

export default UserPage;
