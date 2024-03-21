import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { appContext } from "@/App";
import { Button } from "../ui/button";

const handleDeleteMessage = (id) => {
  fetch(`http://localhost:3000/messages/${id}`, {
    credentials: "include",
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const Card = ({ message, fullName, id, createdAt, admin, user }) => {
  const { isLogged } = useContext(appContext);
  return (
    <div
      key={id}
      className="flex flex-col gap-1 border-2 border-slate-950 rounded-md py-1 pl-2"
    >
      <div>{message}</div>
      {(user.member === true || user.admin === true) && isLogged ? (
        <div className="sm:flex sm:gap-2 flex flex-col flex-wrap">
          <div>
            By <span className="font-bold pr-1">{fullName}</span>
            {admin && <Badge>Admin</Badge>}
          </div>
          <div>
            on <span>{createdAt}</span>
          </div>
          {user.admin && (
            <div className="w-6">
              <Button
                onClick={() => handleDeleteMessage(id)}
                size={"sm"}
                variant={"destructive"}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <hr />
          <div className="font-bold">Join the club to view details</div>
        </>
      )}
    </div>
  );
};

export default Card;
