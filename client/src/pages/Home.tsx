import Card from "@/components/custom/Card";
import { useState, useEffect, useContext } from "react";
import { appContext } from "@/App";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(appContext);
  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  console.log(messages);
  return (
    <div>
      <div className="py-2 px-3 sm:pt-5 sm:px-7 flex flex-col gap-2">
        {messages.map((message) => (
          <Card
            key={message._id}
            message={message.message}
            fullName={message.user.fullName}
            createdAt={message.createdAt}
            user={user}
            admin={message.user.admin}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
