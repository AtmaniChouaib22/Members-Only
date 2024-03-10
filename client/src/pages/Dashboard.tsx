import Card from "@/components/custom/Card";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/protected", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  console.log(messages);
  return (
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
  );
};

export default Dashboard;
