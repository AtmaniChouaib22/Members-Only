import Navbar from "@/components/custom/Navbar";
import Card from "@/components/custom/Card";
import { useState, useEffect } from "react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  console.log(messages);
  return (
    <div>
      <Navbar />
      <div>
        {messages.map((message) => (
          <Card
            key={message._id}
            message={message.message}
            fullName={message.user.fullName}
            createdAt={message.createdAt}
            admin={message.user.admin}
            member={message.user.member}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
