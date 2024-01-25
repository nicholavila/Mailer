"use client";

import { Button } from "@/components/ui/button";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const NewEmail = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold mb-4">
        Create a new Email
      </p>
      <p className="text-xl text-gray-500 mb-12">Name: Email Title</p>
      <p className="text-xl text-gray-500 mb-6">To: Select your Customers</p>
      <p className="text-xl text-gray-500 mb-6">From: Email Name</p>
      <p className="text-xl text-gray-500 mb-6">
        Subject: Subject Line for email
      </p>
      <p className="text-xl text-gray-500 mb-6">
        Send Time: When should we send this email
      </p>
    </main>
  );
};

export default NewEmail;