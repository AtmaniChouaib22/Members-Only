import Card from "@/components/custom/Card";
import { useState, useEffect, useContext } from "react";
import { appContext } from "@/App";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(appContext);

  useEffect(() => {
    fetch("http://localhost:3000/protected", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  return (
    <div className="py-2 px-3 sm:pt-5 sm:px-7 flex flex-col gap-2">
      {messages.map((message) => (
        <Card
          key={message._id}
          message={message.message}
          fullName={message.user.fullName}
          createdAt={message.createdAt}
          admin={message.user.admin}
          user={user}
        />
      ))}
    </div>
  );
};

export default Dashboard;
