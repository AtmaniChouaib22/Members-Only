import Card from "@/components/custom/Card";
import { useState, useEffect, useContext } from "react";
import { appContext } from "@/App";
import FadeLoader from "react-spinners/FadeLoader";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const { user, loading, setLoading } = useContext(appContext);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="py-2 px-3 sm:pt-5 sm:px-7 flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center items-center">
            <FadeLoader color="rgba(21, 17, 121, 1)" />
          </div>
        ) : (
          messages.map((message) => (
            <Card
              key={message._id}
              message={message.message}
              fullName={message.user.fullName}
              createdAt={message.createdAt}
              user={user}
              admin={message.user.admin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
